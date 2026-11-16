import React from "react";
import { Link } from "react-router-dom";
import { Clock, Flame } from "lucide-react";

export default function ArticleCard({ article, layout = "standard" }) {
  if (!article) return null;

  const isCompact = layout === "compact";
  const isHorizontal = layout === "horizontal";

  if (isHorizontal) {
    return (
      <article className="group flex flex-col sm:flex-row gap-5 p-4 rounded-lg bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] hover:border-[#315CF5]/50 transition-all duration-200 shadow-sm">
        <Link
          to={`/articles/${article.slug}`}
          className="sm:w-1/3 aspect-[16/10] overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 flex-shrink-0"
        >
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider mb-2">
              <Link
                to={`/category/${article.categorySlug || article.category?.toLowerCase()}`}
                className="text-[#315CF5] font-semibold hover:underline"
              >
                {article.category}
              </Link>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readingTime || "5 min"}
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug group-hover:text-[#315CF5] transition-colors">
              <Link to={`/articles/${article.slug}`}>
                {article.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {article.subtitle || article.excerpt}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>By {article.authorName}</span>
            <time dateTime={article.publishedAt}>
              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
            </time>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col bg-white dark:bg-[#181B22] rounded-lg border border-[#E5E7EB] dark:border-[#262A36] overflow-hidden hover:border-[#315CF5]/50 transition-all duration-200 shadow-sm">
      <Link
        to={`/articles/${article.slug}`}
        className="aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative block"
      >
        <img
          src={article.featuredImage}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {(article.trending || article.hot) && (
          <span className="absolute top-3 left-3 bg-[#171717]/90 text-white text-[11px] font-mono px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
            <Flame className="w-3 h-3 text-[#315CF5]" />
            Trending
          </span>
        )}
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-wider mb-2.5">
            <Link
              to={`/category/${article.categorySlug || article.category?.toLowerCase()}`}
              className="text-[#315CF5] font-semibold hover:underline"
            >
              {article.category}
            </Link>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime || "5 min"}
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold leading-snug group-hover:text-[#315CF5] transition-colors mb-2.5">
            <Link to={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          {!isCompact && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
              {article.subtitle || article.excerpt}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <Link
            to={`/authors/${article.authorId}`}
            className="hover:text-[#315CF5] transition-colors"
          >
            By {article.authorName}
          </Link>
          <time dateTime={article.publishedAt}>
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
          </time>
        </div>
      </div>
    </article>
  );
}
