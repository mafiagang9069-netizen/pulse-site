import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import ArticleCard from "../components/article/ArticleCard";
import SEO from "../components/common/SEO";
import { getPublishedArticles } from "../firebase/firestore";
import { INITIAL_AUTHORS, INITIAL_ARTICLES } from "../data/initialData";

export default function AuthorProfilePage() {
  const { slug } = useParams();
  const authorSlug = slug ? slug.toLowerCase() : "";

  const [author, setAuthor] = useState(null);
  const [authorArticles, setAuthorArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadAuthorData() {
      setLoading(true);
      window.scrollTo(0, 0);

      const matched = INITIAL_AUTHORS[authorSlug] || {
        name: authorSlug.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
        role: "Editorial Correspondent",
        bio: "Contributor reporting on emerging developments and cultural shifts for PULSE.",
        initials: authorSlug.split("-").map(p => p[0]?.toUpperCase()).join(""),
        verified: false,
        verificationNote: "Contributor profile — identity and biographical details are awaiting editorial verification."
      };

      if (isMounted) setAuthor(matched);

      try {
        const allArticles = await getPublishedArticles({ maxItems: 50 });
        const byAuthor = allArticles.filter(a => 
          a.authorId?.toLowerCase() === authorSlug ||
          a.authorName?.toLowerCase().replace(/\s+/g, "-") === authorSlug
        );
        if (isMounted) {
          setAuthorArticles(byAuthor);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const fallback = INITIAL_ARTICLES.filter(a => a.authorId === authorSlug);
          setAuthorArticles(fallback);
          setLoading(false);
        }
      }
    }

    loadAuthorData();
    return () => { isMounted = false; };
  }, [authorSlug]);

  if (!author) return null;

  return (
    <div>
      <SEO
        title={`${author.name} — Contributor Profile`}
        description={author.bio}
        canonicalPath={`/authors/${authorSlug}`}
        noIndex={!author.verified} // As per SEO and editorial instructions, unverified profiles carry noindex
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-8">
          <Link to="/" className="hover:text-[#315CF5]">Home</Link>
          <span>/</span>
          <span className="text-neutral-400">Authors</span>
          <span>/</span>
          <span className="text-[#171717] dark:text-white font-medium">{author.name}</span>
        </nav>

        {/* Verification Status Banner */}
        <div className="mb-8 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-white">Status Notice: </span>
            {author.verificationNote || "Contributor profile — identity and biographical details are awaiting editorial verification."}
          </div>
        </div>

        {/* Author Bio Header Card */}
        <div className="p-8 rounded-2xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] shadow-sm mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#171717] dark:bg-neutral-800 text-white flex items-center justify-center font-mono text-2xl sm:text-3xl font-bold shadow-md flex-shrink-0">
            {author.initials}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#171717] dark:text-white">
                {author.name}
              </h1>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                Staff Correspondent
              </span>
            </div>

            <div className="text-sm font-mono text-[#315CF5] font-semibold mt-1 mb-3">
              {author.role}
            </div>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
              {author.bio}
            </p>
          </div>
        </div>

        {/* Articles by Author Section */}
        <div className="border-b border-[#E5E7EB] dark:border-[#262A36] pb-4 mb-8 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#171717] dark:text-white">
            Articles by {author.name}
          </h2>
          <span className="text-xs font-mono text-neutral-500">
            {authorArticles.length} {authorArticles.length === 1 ? "story" : "stories"} published
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse bg-white dark:bg-[#181B22] rounded-lg p-5 border border-neutral-200 dark:border-neutral-800 h-80" />
            ))}
          </div>
        ) : authorArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authorArticles.map((art) => (
              <ArticleCard key={art.id || art.slug} article={art} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-[#181B22] rounded-xl border border-neutral-200 dark:border-neutral-800 p-8">
            <p className="text-neutral-500 text-sm">
              No published articles found for this contributor at this time.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
