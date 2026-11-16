import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleCard from "../components/article/ArticleCard";
import SEO from "../components/common/SEO";
import { getPublishedArticles, getCategories } from "../firebase/firestore";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES } from "../data/initialData";

export default function CategoryPage({ categoryNameOverride }) {
  const { slug } = useParams();
  const currentSlug = (categoryNameOverride || slug || "technology").toLowerCase();

  const [articles, setArticles] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest"); // 'latest' | 'trending'

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        // Find category info
        const cats = await getCategories();
        const found = cats.find(c => c.slug.toLowerCase() === currentSlug || c.name.toLowerCase() === currentSlug);
        const fallbackCat = INITIAL_CATEGORIES.find(c => c.slug.toLowerCase() === currentSlug || c.name.toLowerCase() === currentSlug) || {
          name: currentSlug.charAt(0).toUpperCase() + currentSlug.slice(1).replace("-", " "),
          slug: currentSlug,
          description: `All PULSE reporting, analysis, and perspective filed under ${currentSlug}.`,
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"
        };

        if (isMounted) setCategoryInfo(found || fallbackCat);

        // Fetch articles
        const data = await getPublishedArticles({ category: currentSlug });
        if (isMounted) {
          setArticles(data || []);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const fallback = INITIAL_ARTICLES.filter(a => 
            a.categorySlug?.toLowerCase() === currentSlug || 
            a.category?.toLowerCase() === currentSlug ||
            a.category?.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-") === currentSlug
          );
          setArticles(fallback);
          setLoading(false);
        }
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [currentSlug]);

  const sortedArticles = [...articles].sort((a, b) => {
    if (sortOrder === "trending") {
      return (b.trending || b.hot ? 1 : 0) - (a.trending || a.hot ? 1 : 0);
    }
    return new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt);
  });

  const catName = categoryInfo?.name || currentSlug.charAt(0).toUpperCase() + currentSlug.slice(1);

  return (
    <div>
      <SEO
        title={`${catName} News & Analysis`}
        description={categoryInfo?.description || `Explore comprehensive reporting and editorial analysis in ${catName}.`}
        canonicalPath={`/category/${currentSlug}`}
        image={categoryInfo?.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-6">
          <Link to="/" className="hover:text-[#315CF5] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-neutral-400">Categories</span>
          <span>/</span>
          <span className="text-[#171717] dark:text-white font-medium">{catName}</span>
        </nav>

        {/* Category Editorial Hero Banner */}
        <section className="relative rounded-2xl overflow-hidden mb-12 bg-neutral-900 text-white min-h-[220px] sm:min-h-[260px] flex items-center">
          <img
            src={categoryInfo?.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85"}
            alt={catName}
            className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />

          <div className="relative z-10 p-6 sm:p-10 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#315CF5] font-bold block mb-2">
              Editorial Desk
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {catName}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
              {categoryInfo?.description || `Deep dives, breaking shifts, and thoughtful perspective in ${catName}.`}
            </p>
            <div className="mt-4 text-xs font-mono text-neutral-400">
              {articles.length} article{articles.length !== 1 ? "s" : ""} filed under this desk
            </div>
          </div>
        </section>

        {/* Controls & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-8 border-b border-[#E5E7EB] dark:border-[#262A36] gap-4">
          <div className="text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            Showing <span className="font-bold text-[#171717] dark:text-white">{sortedArticles.length}</span> published stories
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-neutral-400">Sort:</span>
            <button
              onClick={() => setSortOrder("latest")}
              className={`px-3 py-1.5 rounded transition-colors ${
                sortOrder === "latest"
                  ? "bg-[#315CF5] text-white font-bold"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Latest First
            </button>
            <button
              onClick={() => setSortOrder("trending")}
              className={`px-3 py-1.5 rounded transition-colors ${
                sortOrder === "trending"
                  ? "bg-[#315CF5] text-white font-bold"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Trending & Radar
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-white dark:bg-[#181B22] rounded-lg p-5 border border-neutral-200 dark:border-neutral-800 h-80" />
            ))}
          </div>
        ) : sortedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArticles.map((art) => (
              <ArticleCard key={art.id || art.slug} article={art} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-[#181B22] rounded-xl border border-neutral-200 dark:border-neutral-800 p-8">
            <h3 className="font-serif text-2xl font-bold text-neutral-700 dark:text-neutral-300">
              No articles published in {catName} yet.
            </h3>
            <p className="mt-2 text-neutral-500 text-sm max-w-md mx-auto">
              Our editors are currently reporting on new developments in this category. Check back shortly.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block px-5 py-2.5 bg-[#315CF5] text-white text-sm font-semibold rounded hover:bg-[#2046DB] transition-colors"
            >
              Back to PULSE Homepage
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
