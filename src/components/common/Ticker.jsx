import React from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { INITIAL_ARTICLES } from "../../data/initialData";

export default function Ticker({ articles = [] }) {
  const displayArticles = articles.length > 0 ? articles : INITIAL_ARTICLES.filter(a => a.trending || a.featured);

  return (
    <div className="bg-[#171717] dark:bg-[#090A0D] text-white py-2 text-xs font-mono tracking-wide border-b border-neutral-800 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="flex items-center gap-1.5 uppercase font-bold text-[#315CF5] dark:text-[#4B73FF] whitespace-nowrap pr-4 border-r border-neutral-700 z-10 bg-[#171717] dark:bg-[#090A0D]">
          <Flame className="w-3.5 h-3.5 animate-pulse text-[#315CF5]" />
          <span>Pulse Radar</span>
        </div>
        
        <div className="overflow-hidden whitespace-nowrap w-full pl-4 flex items-center">
          <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
            {displayArticles.map((art, idx) => (
              <span key={`${art.id || art.slug}-${idx}`} className="inline-flex items-center mx-4">
                <span className="text-neutral-400 mr-2 uppercase text-[10px] tracking-wider bg-neutral-800 px-1.5 py-0.5 rounded">
                  {art.category}
                </span>
                <Link
                  to={`/articles/${art.slug}`}
                  className="text-neutral-200 hover:text-white hover:underline transition-colors mr-6"
                >
                  {art.title}
                </Link>
                <span className="text-neutral-600 mr-2">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
