import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Compass } from "lucide-react";
import SEO from "../components/common/SEO";
import { INITIAL_CATEGORIES } from "../data/initialData";

export default function NotFoundPage() {
  return (
    <div>
      <SEO
        title="Page Not Found (404)"
        description="The editorial page you requested does not exist or may have been relocated."
        canonicalPath="/404"
        noIndex={true}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-[#315CF5] font-bold">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-[#171717] dark:text-white mt-3 mb-4">
          Story Relocated or Missing
        </h1>
        <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-md mx-auto mb-8">
          The page or article you are searching for might have been updated, unpublished, or the URL slug was mistyped.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/"
            className="px-6 py-3 bg-[#315CF5] hover:bg-[#2046DB] text-white text-sm font-semibold rounded-lg flex items-center space-x-2 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Front Page</span>
          </Link>
          <Link
            to="/search"
            className="px-6 py-3 bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] text-neutral-800 dark:text-neutral-200 hover:text-[#315CF5] text-sm font-semibold rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Search className="w-4 h-4" />
            <span>Search Full Archive</span>
          </Link>
        </div>

        {/* Popular Desks */}
        <div className="pt-10 border-t border-[#E5E7EB] dark:border-[#262A36]">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-4 flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#315CF5]" />
            Explore Major Desks
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {INITIAL_CATEGORIES.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="text-xs font-medium px-3.5 py-1.5 rounded bg-[#F1F2F4] dark:bg-[#181B22] text-neutral-700 dark:text-neutral-300 hover:text-[#315CF5] hover:bg-neutral-200 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
