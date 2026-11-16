import React, { useState, useEffect } from "react";
import { FolderKanban, Plus, Check, Trash2, ArrowUpRight } from "lucide-react";
import { getCategories, saveCategory } from "../../firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/common/SEO";
import { INITIAL_CATEGORIES } from "../../data/initialData";

export default function AdminCategories() {
  const { currentUser } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", description: "", image: "" });
  const [feedback, setFeedback] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data || INITIAL_CATEGORIES);
    } catch (e) {
      setCategories(INITIAL_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name.trim()) return;

    const slug = newCat.slug.trim() || newCat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = {
      ...newCat,
      slug,
      id: slug,
      image: newCat.image.trim() || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"
    };

    try {
      await saveCategory(payload, currentUser?.email || "Admin");
      setFeedback(`Desk "${payload.name}" saved successfully!`);
      setNewCat({ name: "", slug: "", description: "", image: "" });
      setShowAddForm(false);
      setTimeout(() => setFeedback(""), 3000);
      loadCategories();
    } catch (err) {
      alert("Error saving category: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <SEO title="Desk Management — CMS" canonicalPath="/admin/categories" noIndex={true} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5]">Taxonomy</span>
          <h1 className="font-serif text-3xl font-extrabold text-[#171717] dark:text-white mt-1">
            Editorial Desks & Sections
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Configure editorial categories, descriptions, and header imagery.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-[#315CF5] hover:bg-[#2046DB] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center space-x-2 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? "Cancel" : "Add New Desk"}</span>
        </button>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center space-x-2">
          <Check className="w-4 h-4" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Add Category Form */}
      {showAddForm && (
        <form onSubmit={handleAddCategory} className="p-6 bg-white dark:bg-[#181B22] rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 animate-fade-in">
          <h3 className="font-serif text-lg font-bold">Create New Editorial Desk</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Name</label>
              <input
                type="text"
                required
                value={newCat.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setNewCat({
                    ...newCat,
                    name: val,
                    slug: val.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                  });
                }}
                placeholder="e.g. Artificial Intelligence"
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Slug</label>
              <input
                type="text"
                required
                value={newCat.slug}
                onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })}
                placeholder="e.g. artificial-intelligence"
                className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs font-mono"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Description</label>
            <textarea
              rows={2}
              value={newCat.description}
              onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
              placeholder="Summary of stories filed under this desk..."
              className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-neutral-500 mb-1">Hero Image URL</label>
            <input
              type="url"
              value={newCat.image}
              onChange={(e) => setNewCat({ ...newCat, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-[#315CF5] text-white text-xs font-mono uppercase font-bold rounded-lg hover:bg-[#2046DB]"
          >
            Save Desk
          </button>
        </form>
      )}

      {/* Grid of Existing Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="bg-white dark:bg-[#181B22] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="aspect-[16/7] relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-serif text-xl font-bold">{cat.name}</h3>
                <span className="text-[10px] font-mono opacity-80">/{cat.slug}</span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                {cat.description}
              </p>
              <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                <a
                  href={`/category/${cat.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#315CF5] font-semibold flex items-center gap-1 hover:underline font-mono"
                >
                  <span>View Public Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
