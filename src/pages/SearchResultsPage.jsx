import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, X, SlidersHorizontal } from "lucide-react";
import ArticleCard from "../components/article/ArticleCard";
import SEO from "../components/common/SEO";
import { getPublishedArticles } from "../firebase/firestore";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES } from "../data/initialData";

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadArticles() {
      try {
        const data = await getPublishedArticles({ maxItems: 50 });
        if (isMounted) {
          setArticles(data || INITIAL_ARTICLES);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setArticles(INITIAL_ARTICLES);
          setLoading(false);
        }
      }
    }
    loadArticles();
    return () => { isMounted = false; };
  }, []);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearQuery = () => {
    setQuery("");
    setSearchParams({});
  };

  // Filter articles based on query & category
  const filteredArticles = articles.filter((art) => {
    const matchCategory = selectedCategory === "all" || 
      art.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      art.categorySlug?.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchCategory) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const matchTitle = art.title?.toLowerCase().includes(q);
    const matchSubtitle = art.subtitle?.toLowerCase().includes(q) || art.excerpt?.toLowerCase().includes(q);
    const matchContent = typeof art.content === "string" ? art.content.toLowerCase().includes(q) : false;
    const matchAuthor = art.authorName?.toLowerCase().includes(q);
    const matchCategoryName = art.category?.toLowerCase().includes(q);
    const matchKeywords = Array.isArray(art.keywords) ? art.keywords.some(k => k.toLowerCase().includes(q)) : false;

    return matchTitle || matchSubtitle || matchContent || matchAuthor || matchCategoryName || matchKeywords;
  });

  return (
    <div>
      <SEO
        title="Search Stories & Analysis"
        description="Search every PULSE article by keyword, topic, author or editorial desk."
        canonicalPath="/search"
        noIndex={true} // Search pages should not be indexed by Google as per SEO guidelines
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Search Header Hero */}
        <section className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315CF5] font-bold block mb-2">
            The Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#171717] dark:text-white mb-4">
            Search PULSE
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
            Search across our entire publishing catalogue by topic, keyword, desk, or author.
          </p>

          {/* Search Input Bar */}
          <div className="relative mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Try searching “AI”, “climate”, “space”, or “longevity”..."
              autoFocus
              className="w-full pl-12 pr-12 py-4 rounded-xl bg-white dark:bg-[#181B22] border-2 border-neutral-200 dark:border-neutral-700 text-base sm:text-lg focus:outline-none focus:border-[#315CF5] dark:focus:border-[#4B73FF] shadow-sm transition-all text-[#171717] dark:text-white"
            />
            {query && (
              <button
                onClick={clearQuery}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Desk Filter Chips */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#315CF5] text-white font-bold"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"
              }`}
            >
              All Desks
            </button>
            {INITIAL_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                  selectedCategory === cat.slug
                    ? "bg-[#315CF5] text-white font-bold"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* Results Metadata Bar */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#E5E7EB] dark:border-[#262A36] text-xs font-mono text-neutral-500">
          <div>
            Found <span className="font-bold text-[#171717] dark:text-white">{filteredArticles.length}</span> {filteredArticles.length === 1 ? "story" : "stories"}
            {query && <span> for &ldquo;{query}&rdquo;</span>}
            {selectedCategory !== "all" && <span> in {selectedCategory}</span>}
          </div>

          {(query || selectedCategory !== "all") && (
            <button
              onClick={() => { clearQuery(); setSelectedCategory("all"); }}
              className="text-[#315CF5] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Articles Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-white dark:bg-[#181B22] rounded-lg p-5 border border-neutral-200 dark:border-neutral-800 h-80" />
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((art) => (
              <ArticleCard key={art.id || art.slug} article={art} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-[#181B22] rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 max-w-lg mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-2">No Matching Stories</h3>
            <p className="text-neutral-500 text-sm">
              We couldn't find any articles matching your search criteria. Try using broader search keywords or clearing desk filters.
            </p>
            <button
              onClick={() => { clearQuery(); setSelectedCategory("all"); }}
              className="mt-6 px-5 py-2.5 bg-[#315CF5] text-white text-sm font-semibold rounded hover:bg-[#2046DB] transition-colors"
            >
              Clear Search & Show All
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
