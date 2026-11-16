import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Clock, Calendar, ArrowLeft, ArrowRight, Share2, 
  Linkedin, Mail, Check, AlertCircle, Bookmark, Copy 
} from "lucide-react";
import SEO from "../components/common/SEO";
import ReadingProgress from "../components/common/ReadingProgress";
import ArticleCard from "../components/article/ArticleCard";
import { getArticleBySlug, getPublishedArticles } from "../firebase/firestore";
import { INITIAL_ARTICLES, INITIAL_AUTHORS, BRAND_CONFIG } from "../data/initialData";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [prevArticle, setPrevArticle] = useState(null);
  const [nextArticle, setNextArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadArticleData() {
      setLoading(true);
      window.scrollTo(0, 0);

      try {
        // Strip .html suffix if user accessed legacy link like /articles/ai-agents.html
        const cleanSlug = slug ? slug.replace(/\.html$/, "") : "";
        const data = await getArticleBySlug(cleanSlug);

        if (!data) {
          if (isMounted) {
            setArticle(null);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setArticle(data);
          
          // Match author
          const matchedAuthor = INITIAL_AUTHORS[data.authorId] || {
            name: data.authorName || "Editorial Contributor",
            role: "PULSE Correspondent",
            bio: "Reporting on critical shifts across science, industry, and modern culture.",
            initials: data.authorName ? data.authorName.split(" ").map(n => n[0]).join("") : "PC",
            verified: false,
            verificationNote: "Contributor profile — identity and biographical details are awaiting editorial verification."
          };
          setAuthor(matchedAuthor);

          // Fetch all articles to compute related, prev, next
          const all = await getPublishedArticles({ maxItems: 40 });
          const related = all.filter(a => 
            (a.category === data.category || a.categorySlug === data.categorySlug) && 
            a.slug !== data.slug
          ).slice(0, 3);
          setRelatedArticles(related);

          const currentIndex = all.findIndex(a => a.slug === data.slug);
          if (currentIndex !== -1) {
            setPrevArticle(currentIndex > 0 ? all[currentIndex - 1] : null);
            setNextArticle(currentIndex < all.length - 1 ? all[currentIndex + 1] : null);
          }

          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading article:", err);
        if (isMounted) setLoading(false);
      }
    }

    loadArticleData();
    return () => { isMounted = false; };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4 mx-auto" />
          <div className="h-12 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2 mx-auto" />
          <div className="h-96 bg-neutral-200 dark:bg-neutral-800 rounded w-full mt-8" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Story Not Found</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          The requested article may have been unpublished, moved, or the URL slug is incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-[#315CF5] text-white font-semibold rounded hover:bg-[#2046DB] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to PULSE Home
        </Link>
      </div>
    );
  }

  const shareUrl = `${BRAND_CONFIG.canonicalHost}/articles/${article.slug}`;
  const shareTitle = article.title;

  // Render article body paragraphs cleanly
  const paragraphs = Array.isArray(article.content)
    ? article.content
    : typeof article.content === "string"
    ? article.content.split("\n\n").filter(Boolean)
    : [];

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.subtitle || article.excerpt,
    "image": [article.featuredImage],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt,
    "author": {
      "@type": "Person",
      "name": article.authorName,
      "url": `${BRAND_CONFIG.canonicalHost}/authors/${article.authorId}`
    },
    "publisher": {
      "@type": "Organization",
      "name": BRAND_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${BRAND_CONFIG.canonicalHost}/images/pulse-logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    },
    "articleSection": article.category
  };

  return (
    <article className="min-h-screen">
      <ReadingProgress />

      <SEO
        title={article.seoTitle || article.title}
        description={article.metaDescription || article.subtitle || article.excerpt}
        canonicalPath={`/articles/${article.slug}`}
        image={article.featuredImage}
        type="article"
        publishedTime={article.publishedAt}
        modifiedTime={article.updatedAt || article.publishedAt}
        author={article.authorName}
        category={article.category}
        schema={newsArticleSchema}
      />

      {/* Top Breadcrumb & Return Nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 border-b border-[#E5E7EB] dark:border-[#262A36] pb-3">
          <nav className="flex items-center space-x-2">
            <Link to="/" className="hover:text-[#315CF5]">Home</Link>
            <span>/</span>
            <Link to={`/category/${article.categorySlug || article.category?.toLowerCase()}`} className="hover:text-[#315CF5]">
              {article.category}
            </Link>
            <span>/</span>
            <span className="text-neutral-400 truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
          </nav>

          <Link
            to="/"
            className="hidden sm:flex items-center space-x-1 hover:text-[#315CF5] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PULSE Front Page</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8">
        {/* Category Pill & Reading Time */}
        <div className="flex items-center space-x-3 text-xs font-mono uppercase tracking-wider mb-4">
          <Link
            to={`/category/${article.categorySlug || article.category?.toLowerCase()}`}
            className="bg-[#315CF5]/10 text-[#315CF5] dark:text-[#6085FF] font-bold px-3 py-1 rounded hover:bg-[#315CF5]/20 transition-colors"
          >
            {article.category}
          </Link>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTime || "6 min"} read
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] dark:text-white leading-[1.12] tracking-tight">
          {article.title}
        </h1>

        {/* Subtitle / Dek */}
        {(article.subtitle || article.excerpt) && (
          <p className="mt-5 text-lg sm:text-2xl text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
            {article.subtitle || article.excerpt}
          </p>
        )}

        {/* Byline & Timestamps */}
        <div className="mt-8 pt-6 border-t border-[#E5E7EB] dark:border-[#262A36] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-full bg-[#171717] dark:bg-neutral-800 text-white flex items-center justify-center font-mono text-sm font-bold shadow-sm">
              {author?.initials || "MC"}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Link
                  to={`/authors/${article.authorId || "maya-chen"}`}
                  className="font-medium text-sm text-neutral-900 dark:text-white hover:text-[#315CF5] transition-colors"
                >
                  By {article.authorName}
                </Link>
                <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                  Contributor
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-neutral-500 font-mono mt-0.5">
                <time dateTime={article.publishedAt}>
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "August 2026"}
                </time>
                {article.updatedAt && article.updatedAt !== article.publishedAt && (
                  <span>• Updated {new Date(article.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                )}
              </div>
            </div>
          </div>

          {/* Social Share Bar */}
          <div className="flex items-center space-x-2">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="p-2.5 rounded-full bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] text-neutral-600 dark:text-neutral-300 hover:text-[#315CF5] hover:border-[#315CF5] transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="p-2.5 rounded-full bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] text-neutral-600 dark:text-neutral-300 hover:text-[#315CF5] hover:border-[#315CF5] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`}
              aria-label="Email story"
              className="p-2.5 rounded-full bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] text-neutral-600 dark:text-neutral-300 hover:text-[#315CF5] hover:border-[#315CF5] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyLink}
              aria-label="Copy article link"
              className="p-2.5 rounded-full bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] text-neutral-600 dark:text-neutral-300 hover:text-[#315CF5] hover:border-[#315CF5] transition-colors relative"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#171717] text-white text-[10px] font-mono px-2 py-0.5 rounded shadow">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Featured Editorial Photograph */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <figure className="overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-[#E5E7EB] dark:border-[#262A36] shadow-sm">
          <img
            src={article.featuredImage}
            alt={article.title}
            fetchPriority="high"
            decoding="async"
            className="w-full h-auto max-h-[580px] object-cover"
          />
          <figcaption className="p-3 text-xs font-mono text-neutral-500 dark:text-neutral-400 bg-white/70 dark:bg-[#181B22]/70 border-t border-[#E5E7EB] dark:border-[#262A36] flex items-center justify-between">
            <span>Illustration & photography: PULSE Editorial Archives</span>
            <span className="text-[10px] uppercase tracking-wider">{article.category} Desk</span>
          </figcaption>
        </figure>
      </div>

      {/* Article Body Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-16">
        <div className="editorial-content font-sans">
          {paragraphs.map((p, idx) => (
            <p key={idx} className="mb-6 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        {/* Verification Note (Preserving review standard) */}
        <div className="my-10 p-4 rounded-lg bg-[#F1F2F4] dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] flex items-start space-x-3 text-xs text-neutral-600 dark:text-neutral-400">
          <AlertCircle className="w-4 h-4 text-[#315CF5] flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">Editorial Note: </span>
            <span>
              PULSE preserves original reporting and author commentary. Contributor profile details for {article.authorName} are maintained pending final verification.
            </span>
          </div>
        </div>

        {/* Share Footer Row */}
        <div className="pt-6 pb-8 border-y border-[#E5E7EB] dark:border-[#262A36] flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
            Share this story
          </span>
          <div className="flex items-center space-x-3 text-xs font-semibold text-[#315CF5]">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Post on X
            </a>
            <span>•</span>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Share on LinkedIn
            </a>
            <span>•</span>
            <button onClick={handleCopyLink} className="hover:underline">
              {copied ? "Link Copied" : "Copy Article Link"}
            </button>
          </div>
        </div>

        {/* Author Bio Box */}
        {author && (
          <div className="my-12 p-6 sm:p-8 rounded-xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#171717] dark:bg-neutral-800 text-white flex items-center justify-center font-mono text-xl font-bold flex-shrink-0 shadow-md">
              {author.initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Link
                  to={`/authors/${article.authorId || "maya-chen"}`}
                  className="font-serif text-xl font-bold hover:text-[#315CF5] transition-colors"
                >
                  {author.name}
                </Link>
                <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                  Pending Verification
                </span>
              </div>
              <div className="text-xs font-mono text-[#315CF5] mt-1 mb-2">
                {author.role}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {author.bio}
              </p>
              <div className="mt-3">
                <Link
                  to={`/authors/${article.authorId || "maya-chen"}`}
                  className="text-xs font-semibold text-[#315CF5] hover:underline"
                >
                  View full contributor archive &rarr;
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Previous / Next Article Navigation */}
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              to={`/articles/${prevArticle.slug}`}
              className="p-5 rounded-lg bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] hover:border-[#315CF5] transition-all group shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center space-x-1 text-xs font-mono text-neutral-400 mb-2">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Story</span>
              </div>
              <h4 className="font-serif text-base font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-[#315CF5] transition-colors line-clamp-2">
                {prevArticle.title}
              </h4>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              to={`/articles/${nextArticle.slug}`}
              className="p-5 rounded-lg bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] hover:border-[#315CF5] transition-all group shadow-sm flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end space-x-1 text-xs font-mono text-neutral-400 mb-2">
                <span>Next Story</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h4 className="font-serif text-base font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-[#315CF5] transition-colors line-clamp-2">
                {nextArticle.title}
              </h4>
            </Link>
          ) : <div />}
        </div>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#F1F2F4]/60 dark:bg-[#14161D] py-16 border-t border-[#E5E7EB] dark:border-[#262A36]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5]">More Reading</span>
                <h3 className="font-serif text-2xl font-bold mt-1 text-[#171717] dark:text-white">
                  Related in {article.category}
                </h3>
              </div>
              <Link
                to={`/category/${article.categorySlug || article.category?.toLowerCase()}`}
                className="text-xs font-mono text-[#315CF5] hover:underline"
              >
                View all in {article.category} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard key={rel.id || rel.slug} article={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
