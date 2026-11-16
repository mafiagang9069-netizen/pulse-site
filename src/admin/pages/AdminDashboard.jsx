import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FileText, CheckCircle2, Clock, FolderKanban, PlusCircle, 
  ArrowUpRight, RefreshCw, AlertCircle, Database, Check, Eye, Edit3, Trash2 
} from "lucide-react";
import { 
  getAllArticlesAdmin, 
  getCategories, 
  getActivityLogs, 
  toggleArticleStatus,
  deleteArticle,
  seedInitialDataToFirestore
} from "../../firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/common/SEO";
import { INITIAL_ARTICLES } from "../../data/initialData";

export default function AdminDashboard() {
  const { currentUser, isFirebaseConfigured } = useAuth();

  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [migrationStatus, setMigrationStatus] = useState({ state: "idle", message: "" });
  const [actionSuccess, setActionSuccess] = useState("");

  const refreshData = async () => {
    setLoading(true);
    try {
      const [artData, catData, logData] = await Promise.all([
        getAllArticlesAdmin(),
        getCategories(),
        getActivityLogs(10)
      ]);
      setArticles(artData || INITIAL_ARTICLES);
      setCategories(catData || []);
      setLogs(logData || []);
    } catch (err) {
      console.error("Dashboard refresh error:", err);
      setArticles(INITIAL_ARTICLES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleToggleStatus = async (article) => {
    try {
      await toggleArticleStatus(article.id, article.status, article.title, currentUser?.email || "Admin");
      setActionSuccess(`Updated status for "${article.title}"`);
      setTimeout(() => setActionSuccess(""), 3000);
      refreshData();
    } catch (err) {
      alert("Failed to update status: " + err.message);
    }
  };

  const handleDelete = async (article) => {
    if (window.confirm(`Are you sure you want to permanently delete "${article.title}"?`)) {
      try {
        await deleteArticle(article.id, article.title, currentUser?.email || "Admin");
        setActionSuccess(`Deleted article "${article.title}"`);
        setTimeout(() => setActionSuccess(""), 3000);
        refreshData();
      } catch (err) {
        alert("Failed to delete article: " + err.message);
      }
    }
  };

  const handleOneClickMigration = async () => {
    setMigrationStatus({ state: "loading", message: "Migrating 16 original articles to Cloud Firestore..." });
    try {
      const result = await seedInitialDataToFirestore(currentUser?.email || "Admin");
      setMigrationStatus({
        state: "success",
        message: `Successfully migrated ${result.articlesImported} new articles & ${result.categoriesImported} categories into Firestore!`
      });
      refreshData();
    } catch (err) {
      setMigrationStatus({ state: "error", message: err.message || "Migration failed. Please check Firebase configuration." });
    }
  };

  // Compute metrics
  const totalArticles = articles.length;
  const publishedCount = articles.filter(a => a.status === "published").length;
  const draftCount = articles.filter(a => a.status === "draft").length;
  const scheduledCount = articles.filter(a => a.status === "scheduled").length;

  return (
    <div className="space-y-8">
      <SEO title="Editorial Dashboard — CMS" canonicalPath="/admin" noIndex={true} />

      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5]">Newsroom Overview</span>
          <h1 className="font-serif text-3xl font-extrabold text-[#171717] dark:text-white mt-1">
            Editorial CMS Dashboard
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Logged in as <span className="font-medium text-neutral-800 dark:text-neutral-200">{currentUser?.email || "Staff Editor"}</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={refreshData}
            disabled={loading}
            className="p-2 rounded-lg bg-white dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-[#315CF5] transition-colors"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#315CF5]" : ""}`} />
          </button>

          <Link
            to="/admin/articles/new"
            className="px-4 py-2 bg-[#315CF5] hover:bg-[#2046DB] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Article</span>
          </Link>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center space-x-2 animate-fade-in">
          <Check className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Migration / Sync Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/5 to-transparent border border-blue-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase text-[#315CF5] mb-1">
            <Database className="w-4 h-4" />
            <span>Content Migration Engine</span>
          </div>
          <h3 className="font-serif text-lg font-bold">Preserve & Sync 16 Original Articles</h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xl mt-1">
            Safely seed or sync all 16 existing PULSE articles, verified categories, and author metadata into Cloud Firestore without generating duplicates.
          </p>
        </div>

        <button
          onClick={handleOneClickMigration}
          disabled={migrationStatus.state === "loading"}
          className="px-4 py-2.5 bg-[#171717] dark:bg-white text-white dark:text-[#171717] hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider font-bold rounded-lg transition-colors whitespace-nowrap shadow-sm disabled:opacity-50"
        >
          {migrationStatus.state === "loading" ? "Syncing..." : "Sync 16 Articles to Firestore"}
        </button>
      </div>

      {migrationStatus.message && (
        <div className={`p-4 rounded-xl text-xs flex items-center space-x-2 ${
          migrationStatus.state === "success" 
            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
        }`}>
          {migrationStatus.state === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{migrationStatus.message}</span>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-xl bg-white dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono uppercase mb-2">
            <span>Total Articles</span>
            <FileText className="w-4 h-4 text-[#315CF5]" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#171717] dark:text-white">
            {totalArticles}
          </div>
          <div className="text-[11px] text-neutral-400 mt-2 font-mono">
            {publishedCount} live on public site
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono uppercase mb-2">
            <span>Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {publishedCount}
          </div>
          <div className="text-[11px] text-neutral-400 mt-2 font-mono">
            Publicly accessible
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono uppercase mb-2">
            <span>Drafts & Queued</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {draftCount + scheduledCount}
          </div>
          <div className="text-[11px] text-neutral-400 mt-2 font-mono">
            Protected from public view
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between text-neutral-500 text-xs font-mono uppercase mb-2">
            <span>Active Desks</span>
            <FolderKanban className="w-4 h-4 text-purple-500" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-[#171717] dark:text-white">
            {categories.length || 11}
          </div>
          <div className="text-[11px] text-neutral-400 mt-2 font-mono">
            Curated editorial topics
          </div>
        </div>
      </div>

      {/* Recent Articles Management Table */}
      <div className="bg-white dark:bg-[#181B22] rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl font-bold">Recent Editorial Records</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Manage publishing states, preview, and edit copy</p>
          </div>
          <Link
            to="/admin/articles"
            className="text-xs font-mono uppercase tracking-wider text-[#315CF5] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All ({articles.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FAFAF8] dark:bg-[#12151D] text-xs font-mono uppercase text-neutral-500 border-b border-neutral-200 dark:border-neutral-800">
              <tr>
                <th className="py-3 px-6">Story</th>
                <th className="py-3 px-4">Desk</th>
                <th className="py-3 px-4">Byline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {articles.slice(0, 6).map((art) => (
                <tr key={art.id || art.slug} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-9 rounded overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex-shrink-0">
                        <img src={art.featuredImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-xs sm:max-w-sm truncate">
                        <Link
                          to={`/admin/articles/edit/${art.id}`}
                          className="font-serif font-bold text-neutral-900 dark:text-neutral-100 hover:text-[#315CF5] transition-colors"
                        >
                          {art.title}
                        </Link>
                        <div className="text-[11px] font-mono text-neutral-400 truncate">
                          /{art.slug}
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
                      title="Click to toggle status"
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold ${
                        art.status === "published"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20"
                      }`}
                    >
                      {art.status === "published" ? "Published" : "Draft"}
                    </button>
                  </td>

                  <td className="py-4 px-4 font-mono text-xs text-neutral-500">
                    {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
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

      {/* Audit Logs & System Activity */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800">
        <h3 className="font-serif text-lg font-bold mb-4">Newsroom Audit Log</h3>
        <div className="space-y-3 font-mono text-xs">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div key={log.id} className="flex items-start justify-between py-2 border-b border-neutral-100 dark:border-neutral-800/60 last:border-none">
                <div>
                  <span className="font-bold text-[#315CF5]">{log.action}: </span>
                  <span className="text-neutral-700 dark:text-neutral-300">{log.details}</span>
                  <span className="text-neutral-400 ml-2">by {log.userEmail}</span>
                </div>
                <time className="text-neutral-400 flex-shrink-0 ml-4">
                  {log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                </time>
              </div>
            ))
          ) : (
            <p className="text-neutral-400">No activity logged yet.</p>
          )}
        </div>
      </div>

    </div>
  );
}
