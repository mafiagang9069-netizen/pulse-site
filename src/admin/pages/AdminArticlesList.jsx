import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  PlusCircle, Search, Filter, Eye, Edit3, Trash2, 
  CheckCircle2, Clock, Calendar, Flame, AlertCircle, Check 
} from "lucide-react";
import { 
  getAllArticlesAdmin, 
  toggleArticleStatus, 
  deleteArticle, 
  getCategories 
} from "../../firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/common/SEO";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES } from "../../data/initialData";

export default function AdminArticlesList() {
  const { currentUser } = useAuth();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [notification, setNotification] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const [artData, catData] = await Promise.all([
        getAllArticlesAdmin(),
        getCategories()
      ]);
      setArticles(artData || INITIAL_ARTICLES);
      setCategories(catData || INITIAL_CATEGORIES);
    } catch (e) {
      setArticles(INITIAL_ARTICLES);
      setCategories(INITIAL_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (article) => {
    try {
      await toggleArticleStatus(article.id, article.status, article.title, currentUser?.email || "Admin");
      setNotification(`Status updated for "${article.title}"`);
      setTimeout(() => setNotification(""), 3000);
      loadData();
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

  const handleDelete = async (article) => {
    if (window.confirm(`Permanently delete "${article.title}"? This action cannot be undone.`)) {
      try {
        await deleteArticle(article.id, article.title, currentUser?.email || "Admin");
        setNotification(`Deleted "${article.title}"`);
        setTimeout(() => setNotification(""), 3000);
        loadData();
      } catch (err) {
        alert("Error deleting article: " + err.message);
      }
    }
  };

  // Filter articles
  const filtered = articles.filter((art) => {
    const matchesStatus = statusFilter === "all" || art.status === statusFilter;
    const matchesCat = categoryFilter === "all" || 
      art.category?.toLowerCase() === categoryFilter.toLowerCase() ||
      art.categorySlug?.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      art.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.authorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.slug?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <SEO title="Article Management — CMS" canonicalPath="/admin/articles" noIndex={true} />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5]">Catalogue</span>
          <h1 className="font-serif text-3xl font-extrabold text-[#171717] dark:text-white mt-1">
            Story Archive & Management
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Browse, edit, filter, and schedule published and draft stories.
          </p>
        </div>

        <Link
          to="/admin/articles/new"
          className="px-4 py-2.5 bg-[#315CF5] hover:bg-[#2046DB] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Compose New Article</span>
        </Link>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center space-x-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter & Search Controls */}
      <div className="p-4 bg-white dark:bg-[#181B22] rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, slug, or author..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs focus:outline-none focus:border-[#315CF5]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-700 dark:text-neutral-300 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts Only</option>
            <option value="scheduled">Scheduled</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-xs font-mono text-neutral-700 dark:text-neutral-300 focus:outline-none"
          >
            <option value="all">All Desks</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-[#181B22] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFAF8] dark:bg-[#12151D] text-xs font-mono uppercase text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="py-3.5 px-6">Headline & Story</th>
                <th className="py-3.5 px-4">Desk</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Promoted</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {filtered.map((art) => (
                <tr key={art.id || art.slug} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-10 rounded overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
                        <img src={art.featuredImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-xs sm:max-w-md">
                        <Link
                          to={`/admin/articles/edit/${art.id}`}
                          className="font-serif font-bold text-neutral-900 dark:text-neutral-100 hover:text-[#315CF5] transition-colors line-clamp-1"
                        >
                          {art.title}
                        </Link>
                        <div className="text-[11px] font-mono text-neutral-400 truncate">
                          slug: {art.slug} • {art.readingTime || "5 min"} read
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                    {art.category}
                  </td>

                  <td className="py-4 px-4 text-xs text-neutral-700 dark:text-neutral-300">
                    {art.authorName}
                  </td>

                  <td className="py-4 px-4">
                    <button
                      onClick={() => handleToggleStatus(art)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold ${
                        art.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                          : art.status === "scheduled"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                      }`}
                    >
                      {art.status}
                    </button>
                  </td>

                  <td className="py-4 px-4 text-xs font-mono">
                    {art.featured ? (
                      <span className="text-amber-500 font-bold">Cover</span>
                    ) : art.trending ? (
                      <span className="text-[#315CF5] flex items-center gap-0.5">
                        <Flame className="w-3 h-3" /> Radar
                      </span>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>

                  <td className="py-4 px-4 font-mono text-xs text-neutral-500">
                    {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/articles/${art.slug}`}
                        target="_blank"
                        className="p-1.5 text-neutral-400 hover:text-neutral-800 dark:hover:text-white"
                        title="View Public Story"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/articles/edit/${art.id}`}
                        className="p-1.5 text-neutral-400 hover:text-[#315CF5]"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(art)}
                        className="p-1.5 text-neutral-400 hover:text-rose-600"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
