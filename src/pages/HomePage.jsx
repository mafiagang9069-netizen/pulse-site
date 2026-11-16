import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Flame, ChevronRight, Sparkles } from "lucide-react";
import ArticleCard from "../components/article/ArticleCard";
import SEO from "../components/common/SEO";
import { getPublishedArticles } from "../firebase/firestore";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, BRAND_CONFIG } from "../data/initialData";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadArticles() {
      try {
        const data = await getPublishedArticles({ maxItems: 30 });
        if (isMounted) {
          setArticles(data && data.length > 0 ? data : INITIAL_ARTICLES);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setArticles(INITIAL_ARTICLES);
          setLoading(false);
        }
      }
    }
    loadArticles();
    return () => { isMounted = false; };
  }, []);

  // Organize articles into editorial tiers
  // Priority: cover story (featured: true or slug == 'private-space-stations-real-hardware')
  const coverStory = articles.find(a => a.featured) || articles.find(a => a.slug === "private-space-stations-real-hardware") || articles[0];
  const sideRailStories = articles.filter(a => a.id !== coverStory?.id && (a.trending || a.hot)).slice(0, 3);
  const remainingArticles = articles.filter(a => a.id !== coverStory?.id && !sideRailStories.some(s => s.id === a.id));

  // Category specific groupings
  const techArticles = articles.filter(a => a.category?.toLowerCase() === "technology").slice(0, 4);
  const workArticles = articles.filter(a => a.category?.toLowerCase() === "work & culture" || a.category?.toLowerCase() === "business").slice(0, 3);
  const healthArticles = articles.filter(a => a.category?.toLowerCase() === "health" || a.category?.toLowerCase() === "science").slice(0, 3);

  return (
    <div>
      <SEO
        title="What the world is reading right now"
        description={BRAND_CONFIG.description}
        canonicalPath="/"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Editorial Eyebrow Statement */}
        <section className="mb-10 sm:mb-14 pb-8 border-b border-[#E5E7EB] dark:border-[#262A36]">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#315CF5] dark:text-[#4B73FF] mb-3">
            <span className="w-8 h-[2px] bg-[#315CF5]" />
            <span>Independent perspective. Clear reporting.</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171717] dark:text-white leading-[1.15]">
            Stories shaping <span className="italic font-normal">what comes next.</span>
          </h1>
          <p className="mt-4 text-base sm:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl font-normal leading-relaxed">
            {BRAND_CONFIG.description}
          </p>
        </section>

        {/* Lead Hero Section: Cover Story + On Our Radar Rail */}
        {coverStory && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Primary Cover Story (8 Cols) */}
            <div className="lg:col-span-8 group">
              <div className="bg-white dark:bg-[#181B22] rounded-xl border border-[#E5E7EB] dark:border-[#262A36] overflow-hidden shadow-sm hover:border-[#315CF5]/40 transition-all duration-300">
                <Link to={`/articles/${coverStory.slug}`} className="block aspect-[16/9] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <img
                    src={coverStory.featuredImage}
                    alt={coverStory.title}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-wider mb-3">
                    <span className="bg-[#315CF5] text-white px-2.5 py-0.5 rounded font-bold">
                      Cover Story
                    </span>
                    <Link
                      to={`/category/${coverStory.categorySlug || coverStory.category?.toLowerCase()}`}
                      className="text-[#315CF5] font-semibold hover:underline"
                    >
                      {coverStory.category}
                    </Link>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {coverStory.readingTime || "7 min"}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-4xl font-extrabold leading-tight text-[#171717] dark:text-white group-hover:text-[#315CF5] transition-colors">
                    <Link to={`/articles/${coverStory.slug}`}>
                      {coverStory.title}
                    </Link>
                  </h2>

                  <p className="mt-4 text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed">
                    {coverStory.subtitle || coverStory.excerpt}
                  </p>

                  <div className="mt-6 pt-5 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-[#171717] dark:bg-neutral-800 text-white flex items-center justify-center font-mono text-xs font-bold">
                        {coverStory.authorName ? coverStory.authorName.split(" ").map(n => n[0]).join("") : "ED"}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-neutral-900 dark:text-white">
                          By {coverStory.authorName}
                        </div>
                        <time className="text-[11px] font-mono text-neutral-500" dateTime={coverStory.publishedAt}>
                          {coverStory.publishedAt ? new Date(coverStory.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : ""}
                        </time>
                      </div>
                    </div>

                    <Link
                      to={`/articles/${coverStory.slug}`}
                      className="inline-flex items-center space-x-1 text-sm font-semibold text-[#315CF5] hover:text-[#2046DB]"
                    >
                      <span>Read Story</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* On Our Radar Rail (4 Cols) */}
            <aside className="lg:col-span-4 flex flex-col justify-between space-y-6">
              <div className="bg-white dark:bg-[#181B22] p-6 rounded-xl border border-[#E5E7EB] dark:border-[#262A36] shadow-sm h-full flex flex-col">
                <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#262A36] pb-4 mb-5">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-4 h-4 text-[#315CF5]" />
                    <h3 className="font-serif text-lg font-bold text-[#171717] dark:text-white">
                      On Our Radar
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">01 — 03</span>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800 flex-1 flex flex-col justify-around">
                  {sideRailStories.map((story, idx) => (
                    <article key={story.id || story.slug} className="py-4 first:pt-0 last:pb-0 group">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-2xl font-bold text-neutral-300 dark:text-neutral-700 group-hover:text-[#315CF5] transition-colors">
                          0{idx + 1}
                        </span>
                        <div className="flex-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#315CF5] block mb-1">
                            {story.category}
                          </span>
                          <h4 className="font-serif text-base font-bold leading-snug group-hover:text-[#315CF5] transition-colors">
                            <Link to={`/articles/${story.slug}`}>
                              {story.title}
                            </Link>
                          </h4>
                          <div className="mt-2 text-xs font-mono text-neutral-500">
                            {story.readingTime || "5 min"} read
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                  <Link
                    to="/search"
                    className="text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-[#315CF5] flex items-center justify-between group"
                  >
                    <span>Browse All Trending</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </aside>
          </section>
        )}

        {/* Quick Topic Badges Strip */}
        <section className="mb-16 py-4 px-6 rounded-lg bg-[#F1F2F4] dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-wider font-bold text-neutral-500 mr-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#315CF5]" />
            Desks:
          </span>
          {INITIAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="text-xs font-medium px-3 py-1.5 rounded-full bg-white dark:bg-[#222632] text-neutral-700 dark:text-neutral-300 hover:text-[#315CF5] dark:hover:text-[#4B73FF] hover:shadow-sm transition-all"
            >
              {cat.name}
            </Link>
          ))}
        </section>

        {/* The Latest Stories Grid */}
        <section className="mb-16">
          <div className="flex items-end justify-between border-b border-[#E5E7EB] dark:border-[#262A36] pb-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5]">The Feed</span>
              <h2 className="font-serif text-3xl font-bold mt-1 text-[#171717] dark:text-white">
                Ideas worth your time.
              </h2>
            </div>
            <Link
              to="/search"
              className="text-sm font-semibold text-[#315CF5] hover:text-[#2046DB] flex items-center space-x-1"
            >
              <span>Explore Archive</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingArticles.slice(0, 6).map((art) => (
              <ArticleCard key={art.id || art.slug} article={art} />
            ))}
          </div>
        </section>

        {/* Curated Editorial Desk: Technology Spotlight */}
        {techArticles.length > 0 && (
          <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-white to-[#F8F9FA] dark:from-[#181B22] dark:to-[#12141A] border border-[#E5E7EB] dark:border-[#262A36]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5]">Curated Desk</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171717] dark:text-white mt-1">
                  Technology & Frontiers
                </h2>
              </div>
              <Link
                to="/category/technology"
                className="text-xs font-mono uppercase tracking-wider text-[#315CF5] hover:underline flex items-center gap-1"
              >
                <span>All Technology</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techArticles.map((art) => (
                <ArticleCard key={art.id || art.slug} article={art} layout="horizontal" />
              ))}
            </div>
          </section>
        )}

        {/* Two-Column Deep Dives: Work & Culture + Health & Science */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Work & Culture */}
          <div className="bg-white dark:bg-[#181B22] p-6 rounded-xl border border-[#E5E7EB] dark:border-[#262A36]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#262A36] pb-3 mb-6">
              <h3 className="font-serif text-xl font-bold text-[#171717] dark:text-white">
                Work & Culture
              </h3>
              <Link to="/category/work-culture" className="text-xs font-mono text-[#315CF5] hover:underline">
                View Desk &rarr;
              </Link>
            </div>
            <div className="space-y-6">
              {workArticles.map((art) => (
                <ArticleCard key={art.id || art.slug} article={art} layout="compact" />
              ))}
            </div>
          </div>

          {/* Health & Science */}
          <div className="bg-white dark:bg-[#181B22] p-6 rounded-xl border border-[#E5E7EB] dark:border-[#262A36]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] dark:border-[#262A36] pb-3 mb-6">
              <h3 className="font-serif text-xl font-bold text-[#171717] dark:text-white">
                Health & Science
              </h3>
              <Link to="/category/health" className="text-xs font-mono text-[#315CF5] hover:underline">
                View Desk &rarr;
              </Link>
            </div>
            <div className="space-y-6">
              {healthArticles.map((art) => (
                <ArticleCard key={art.id || art.slug} article={art} layout="compact" />
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Mission Callout Box */}
        <section className="bg-[#171717] text-white rounded-2xl p-8 sm:p-12 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="text-4xl font-serif font-black text-[#315CF5] mb-2">P.</div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#315CF5] block mb-2">
              The PULSE Philosophy
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Less noise. More signal.
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
              We look beyond the breathless breaking headline to explain why a shift matters, what is changing beneath the surface, and what readers should question.
            </p>
          </div>
          <Link
            to="/about"
            className="px-6 py-3.5 bg-white text-[#171717] hover:bg-neutral-100 font-semibold text-sm rounded shadow transition-all whitespace-nowrap flex items-center space-x-2"
          >
            <span>Our Editorial Standards</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </section>

      </div>
    </div>
  );
}
