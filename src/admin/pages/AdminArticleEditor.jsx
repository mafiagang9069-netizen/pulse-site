import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Save, Eye, ArrowLeft, Upload, Check, AlertCircle, 
  Clock, Calendar, Sparkles, Hash, Bold, Italic, 
  Heading2, Heading3, List, ListOrdered, Quote, Link as LinkIcon, 
  Image as ImageIcon, HelpCircle, X, ExternalLink 
} from "lucide-react";
import { 
  getArticleBySlug, 
  createArticle, 
  updateArticle, 
  getCategories 
} from "../../firebase/firestore";
import { uploadImage } from "../../firebase/storage";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/common/SEO";
import { INITIAL_CATEGORIES, INITIAL_AUTHORS, BRAND_CONFIG } from "../../data/initialData";

export default function AdminArticleEditor() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { currentUser, isFirebaseConfigured } = useAuth();

  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const contentTextareaRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    excerpt: "",
    content: "",
    featuredImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85",
    category: "Technology",
    categorySlug: "technology",
    authorId: "maya-chen",
    authorName: "Maya Chen",
    status: "draft", // 'draft' | 'published' | 'scheduled'
    scheduledDate: "",
    featured: false,
    trending: false,
    seoTitle: "",
    metaDescription: "",
    keywords: "technology, innovation, reporting",
    readingTime: "5 min"
  });

  // Calculate Reading Time & Word Count
  const words = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;
  const estimatedMins = Math.max(1, Math.ceil(words / 225));

  useEffect(() => {
    setFormData(prev => ({ ...prev, readingTime: `${estimatedMins} min` }));
  }, [words]);

  // Load Categories & Existing Article if editing
  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        const cats = await getCategories();
        if (isMounted && cats && cats.length > 0) setCategories(cats);

        if (isEditing) {
          const art = await getArticleBySlug(id);
          if (art && isMounted) {
            setFormData({
              ...art,
              keywords: Array.isArray(art.keywords) ? art.keywords.join(", ") : (art.keywords || ""),
              content: typeof art.content === "string" ? art.content : Array.isArray(art.content) ? art.content.join("\n\n") : ""
            });
          }
        }
      } catch (err) {
        console.error("Editor init error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    init();
    return () => { isMounted = false; };
  }, [id, isEditing]);

  // Auto-generate slug when title changes (if slug is untouched)
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    const autoSlug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: isEditing ? prev.slug : autoSlug,
      seoTitle: prev.seoTitle || (newTitle ? `${newTitle} — ${BRAND_CONFIG.name}` : "")
    }));
  };

  // Quick insertion helpers for rich article editor
  const insertFormatting = (prefix, suffix = "", defaultText = "") => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end) || defaultText;

    const replacement = `${prefix}${selected}${suffix}`;
    const newContent = text.substring(0, start) + replacement + text.substring(end);

    setFormData(prev => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // 100% Free Image Upload Handler (No Firebase Storage billing account needed!)
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setUploadProgress(30);

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadProgress(70);
      const img = new Image();
      img.onload = () => {
        // Optimize and compress image on canvas so it fits cleanly in Firestore for FREE
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL("image/jpeg", 0.78);
        setFormData(prev => ({ ...prev, featuredImage: optimizedDataUrl }));
        setUploadProgress(100);
        setUploadingImage(false);
        setFeedback({ 
          type: "success", 
          message: "Image compressed and saved for 100% FREE — no paid Firebase Storage plan required!" 
        });
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      setUploadingImage(false);
      setFeedback({ type: "error", message: "Failed to read image file." });
    };
    reader.readAsDataURL(file);
  };

  // Save / Publish
  const handleSave = async (targetStatus = formData.status) => {
    if (!formData.title.trim()) {
      alert("Please enter an article headline.");
      return;
    }

    setSaving(true);
    setFeedback({ type: "", message: "" });

    try {
      const keywordsArray = typeof formData.keywords === "string" 
        ? formData.keywords.split(",").map(k => k.trim()).filter(Boolean)
        : formData.keywords;

      const payload = {
        ...formData,
        status: targetStatus,
        keywords: keywordsArray,
        authorName: INITIAL_AUTHORS[formData.authorId]?.name || formData.authorName,
        categorySlug: formData.category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        readingTime: `${estimatedMins} min`,
        publishedAt: targetStatus === "published" ? (formData.publishedAt || new Date().toISOString()) : (targetStatus === "scheduled" ? formData.scheduledDate : null)
      };

      if (isEditing) {
        await updateArticle(id, payload, currentUser?.email || "Admin");
        setFeedback({ type: "success", message: `Article successfully updated as ${targetStatus}!` });
      } else {
        const created = await createArticle(payload, currentUser?.email || "Admin");
        setFeedback({ type: "success", message: `Article published/saved as ${targetStatus}!` });
        navigate(`/admin/articles/edit/${created.id || created.slug}`);
      }
    } catch (err) {
      setFeedback({ type: "error", message: err.message || "Failed to save article." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <div className="w-8 h-8 border-2 border-[#315CF5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-mono text-xs text-neutral-500 uppercase">Loading Article Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SEO title={isEditing ? `Editing: ${formData.title}` : "Compose Story — CMS"} canonicalPath="/admin/articles/new" noIndex={true} />

      {/* Editor Sub-Header Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center space-x-3">
          <Link
            to="/admin/articles"
            className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-serif text-2xl font-bold">
              {isEditing ? "Edit Article" : "Compose New Story"}
            </h1>
            <div className="text-xs font-mono text-neutral-400">
              {words} words • ~{estimatedMins} min estimated read
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#181B22] text-xs font-mono uppercase tracking-wider text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4 text-[#315CF5]" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("draft")}
            className="px-3.5 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 flex items-center space-x-1.5 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("published")}
            className="px-5 py-2 rounded-lg bg-[#315CF5] hover:bg-[#2046DB] text-white text-xs font-mono uppercase tracking-wider font-bold flex items-center space-x-1.5 transition-colors shadow-sm disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{saving ? "Publishing..." : "Publish Live"}</span>
          </button>
        </div>
      </div>

      {feedback.message && (
        <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
          feedback.type === "success" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" :
          feedback.type === "error" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20" :
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
        }`}>
          {feedback.type === "success" && <Check className="w-4 h-4" />}
          {feedback.type === "error" && <AlertCircle className="w-4 h-4" />}
          {feedback.type === "info" && <HelpCircle className="w-4 h-4" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Two Column Publishing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Headline, Subtitle, Rich Editor (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Headline */}
          <div className="bg-white dark:bg-[#181B22] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                Headline (Title) *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter a compelling editorial headline..."
                className="w-full px-4 py-3 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 font-serif text-xl sm:text-2xl font-bold focus:outline-none focus:border-[#315CF5]"
              />
            </div>

            {/* Subtitle / Dek */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                Subtitle / Dek (Article Excerpt)
              </label>
              <textarea
                rows={2}
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value, excerpt: e.target.value })}
                placeholder="A one-or-two sentence editorial summary explaining the significance of the story..."
                className="w-full px-4 py-2.5 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#315CF5]"
              />
            </div>

            {/* URL Slug Editor */}
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                Permanent URL Slug
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-xs font-mono border border-r-0 border-neutral-300 dark:border-neutral-700 rounded-l-lg">
                  /articles/
                </span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 px-3 py-2 rounded-r-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs font-mono focus:outline-none focus:border-[#315CF5]"
                />
              </div>
            </div>
          </div>

          {/* Rich Content Editor */}
          <div className="bg-white dark:bg-[#181B22] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="p-3 bg-[#FAFAF8] dark:bg-[#12151D] border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => insertFormatting("## ", "\n", "Heading 2")}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Heading 2"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("### ", "\n", "Heading 3")}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Heading 3"
              >
                <Heading3 className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-5 bg-neutral-300 dark:bg-neutral-700 mx-1" />
              <button
                type="button"
                onClick={() => insertFormatting("**", "**", "bold text")}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("*", "*", "italic text")}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-5 bg-neutral-300 dark:bg-neutral-700 mx-1" />
              <button
                type="button"
                onClick={() => insertFormatting("> ", "\n", "Quote text")}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Blockquote"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("- ", "\n", "Bullet point")}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("1. ", "\n", "Numbered point")}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-5 bg-neutral-300 dark:bg-neutral-700 mx-1" />
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter link URL:", "https://");
                  if (url) insertFormatting("[", `](${url})`, "link text");
                }}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Insert Link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Enter image URL:", "https://images.unsplash.com/...");
                  if (url) insertFormatting(`\n![Editorial Image](${url})\n`);
                }}
                className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                title="Insert Inline Image URL"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Text Area */}
            <div className="p-4 sm:p-6">
              <textarea
                ref={contentTextareaRef}
                rows={18}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write the article copy here. Separate paragraphs with double newlines. Markdown headings and lists are supported..."
                className="w-full bg-transparent focus:outline-none font-sans text-base sm:text-lg leading-relaxed text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 resize-y"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Publishing Controls, Category, Author, Featured Image, SEO (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Publishing Controls Card */}
          <div className="bg-white dark:bg-[#181B22] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold">Publishing State</h3>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs font-mono focus:outline-none focus:border-[#315CF5]"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Public)</option>
                <option value="scheduled">Scheduled Publication</option>
              </select>
            </div>

            {formData.status === "scheduled" && (
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                  Scheduled Release Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs font-mono focus:outline-none"
                />
              </div>
            )}

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
              <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#315CF5] focus:ring-[#315CF5]"
                />
                <span>Promote to Cover Story (Hero)</span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.trending}
                  onChange={(e) => setFormData({ ...formData, trending: e.target.checked })}
                  className="rounded text-[#315CF5] focus:ring-[#315CF5]"
                />
                <span>Add to On Our Radar / Pulse Ticker</span>
              </label>
            </div>
          </div>

          {/* Desk & Author Assignment Card */}
          <div className="bg-white dark:bg-[#181B22] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold">Desk & Byline</h3>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                Editorial Desk (Category)
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const found = categories.find(c => c.name === selectedName);
                  setFormData({
                    ...formData,
                    category: selectedName,
                    categorySlug: found?.slug || selectedName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                  });
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none focus:border-[#315CF5]"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1.5">
                Author / Correspondent
              </label>
              <select
                value={formData.authorId}
                onChange={(e) => {
                  const id = e.target.value;
                  const authInfo = INITIAL_AUTHORS[id];
                  setFormData({
                    ...formData,
                    authorId: id,
                    authorName: authInfo ? authInfo.name : "Editorial Contributor"
                  });
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none focus:border-[#315CF5]"
              >
                {Object.entries(INITIAL_AUTHORS).map(([key, author]) => (
                  <option key={key} value={key}>{author.name} ({author.role})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Editorial Photograph Card */}
          <div className="bg-white dark:bg-[#181B22] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">Featured Image</h3>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                100% Free
              </span>
            </div>

            {formData.featuredImage && (
              <div className="aspect-[16/9] rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 relative">
                <img
                  src={formData.featuredImage}
                  alt="Featured Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Free Quick Presets */}
            <div>
              <span className="block text-[11px] font-mono uppercase text-neutral-400 mb-1.5">
                Quick Free Editorial Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Tech / AI", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85" },
                  { label: "Space", url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=85" },
                  { label: "Business", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85" },
                  { label: "Health", url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=85" },
                  { label: "Climate", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=85" },
                  { label: "Culture", url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85" }
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, featuredImage: preset.url }))}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-[#F1F2F4] dark:bg-[#12141A] text-neutral-700 dark:text-neutral-300 hover:bg-[#315CF5] hover:text-white transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">
                Image URL (Unsplash, Pexels, Web)
              </label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">
                Or Upload from Computer (Free Auto-Compression)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                disabled={uploadingImage}
                className="w-full text-xs text-neutral-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-[#315CF5] file:text-white hover:file:bg-[#2046DB] file:cursor-pointer"
              />
              {uploadingImage && (
                <div className="mt-1.5 text-xs font-mono text-[#315CF5]">
                  Optimizing photo... {uploadProgress}%
                </div>
              )}
              <span className="block text-[10px] text-neutral-400 mt-1">
                Optimized automatically for Cloud Firestore — no paid Blaze storage account required.
              </span>
            </div>
          </div>

          {/* SEO & Meta Tags Card */}
          <div className="bg-white dark:bg-[#181B22] p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold">SEO & Metadata</h3>
              <span className="text-[10px] font-mono text-[#315CF5] uppercase font-bold">Google Ready</span>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono uppercase text-neutral-500 mb-1">
                <span>SEO Page Title</span>
                <span className={formData.seoTitle.length > 60 ? "text-amber-500 font-bold" : ""}>
                  {formData.seoTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Title tag displayed on search engines..."
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono uppercase text-neutral-500 mb-1">
                <span>Meta Description</span>
                <span className={formData.metaDescription.length > 160 ? "text-amber-500 font-bold" : ""}>
                  {formData.metaDescription.length}/160
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                placeholder="Meta description displayed on search results..."
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">
                Target Keywords (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="e.g. AI agents, autonomous coding, software"
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none"
              />
            </div>

            {/* Google SERP Snippet Preview */}
            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                Google SERP Preview
              </span>
              <div className="p-3 rounded-lg bg-neutral-50 dark:bg-[#12151D] border border-neutral-200 dark:border-neutral-800 text-left">
                <div className="text-[11px] text-neutral-500 truncate font-mono">
                  {BRAND_CONFIG.canonicalHost}/articles/{formData.slug || "story-slug"}
                </div>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline truncate mt-0.5">
                  {formData.seoTitle || formData.title || "Story Headline — PULSE"}
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1">
                  {formData.metaDescription || formData.subtitle || "Article summary displayed in Google search results."}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Full Live Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAFAF8] dark:bg-[#0F1115] w-full max-w-4xl rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800 max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-[#181B22]">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#315CF5]/10 text-[#315CF5] font-bold">
                  Live Editorial Simulation
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {formData.status.toUpperCase()} PREVIEW
                </span>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-1 rounded text-neutral-500 hover:text-black dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-10 overflow-y-auto flex-1">
              <div className="text-xs font-mono uppercase tracking-wider text-[#315CF5] mb-3">
                {formData.category} Desk • {formData.readingTime} read
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#171717] dark:text-white leading-tight">
                {formData.title || "Untitled Story"}
              </h1>
              {formData.subtitle && (
                <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300 font-normal">
                  {formData.subtitle}
                </p>
              )}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center space-x-3 text-xs font-mono text-neutral-500 mb-8">
                <span>By {formData.authorName}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>

              {formData.featuredImage && (
                <img
                  src={formData.featuredImage}
                  alt={formData.title}
                  className="w-full h-auto max-h-96 object-cover rounded-xl mb-8"
                />
              )}

              <div className="editorial-content font-sans">
                {formData.content ? (
                  formData.content.split("\n\n").map((para, i) => (
                    <p key={i} className="mb-5 leading-relaxed">{para}</p>
                  ))
                ) : (
                  <p className="text-neutral-400 italic">No article content entered yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
