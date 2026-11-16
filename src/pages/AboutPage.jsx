import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Target, Award, Users } from "lucide-react";
import SEO from "../components/common/SEO";
import { INITIAL_AUTHORS, BRAND_CONFIG } from "../data/initialData";

export default function AboutPage() {
  return (
    <div>
      <SEO
        title="About PULSE — Editorial Perspective & Standards"
        description="Learn about PULSE, our independent editorial mission, reporting principles, and the team covering technology, science, health, and culture."
        canonicalPath="/about"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-8">
          <Link to="/" className="hover:text-[#315CF5]">Home</Link>
          <span>/</span>
          <span className="text-[#171717] dark:text-white font-medium">About</span>
        </nav>

        {/* Hero Section */}
        <section className="mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315CF5] font-bold block mb-3">
            Our Mission
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#171717] dark:text-white tracking-tight leading-tight">
            Independent perspective. <span className="italic font-normal">Clear reporting.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal">
            PULSE covers the stories that are actually moving through conversation right now — across technology, health, work, climate, and culture — with a focus on what's genuinely new versus what's just loudly marketed.
          </p>
        </section>

        {/* Core Principles */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36]">
            <Target className="w-6 h-6 text-[#315CF5] mb-3" />
            <h3 className="font-serif text-lg font-bold mb-2">Signal Over Noise</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              We bypass breathless incremental headlines to focus on durable macro trends and systemic shifts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36]">
            <ShieldCheck className="w-6 h-6 text-[#315CF5] mb-3" />
            <h3 className="font-serif text-lg font-bold mb-2">Rigorous Verification</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              When evidence is mixed or claims are contested, we articulate the nuance rather than flattening complexity.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36]">
            <Award className="w-6 h-6 text-[#315CF5] mb-3" />
            <h3 className="font-serif text-lg font-bold mb-2">Editorial Independence</h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our reporting is free from commercial influence, algorithmic prioritization, and sponsored masquerades.
            </p>
          </div>
        </section>

        {/* Editorial Standards Statement */}
        <section className="mb-16 pb-12 border-b border-[#E5E7EB] dark:border-[#262A36]">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-4">
            Editorial Standards
          </h2>
          <div className="space-y-4 text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p>
              Every story published on PULSE undergoes editorial review prior to release. We prioritize primary documentation, peer-reviewed literature, and technical verification over marketing claims.
            </p>
            <p>
              If we make an error, we correct it transparently and promptly with an explicit editor's note outlining what was changed. Learn more in our dedicated <Link to="/editorial-policy" className="text-[#315CF5] underline underline-offset-4">Editorial Policy</Link>.
            </p>
          </div>
        </section>

        {/* Contributor Masthead */}
        <section>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#315CF5] mb-2">
            <Users className="w-4 h-4" />
            <span>The Byline Roster</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-8">
            Correspondents & Contributors
          </h2>

          <div className="space-y-6">
            {Object.entries(INITIAL_AUTHORS).map(([slug, author]) => (
              <div
                key={slug}
                className="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-[#171717] dark:bg-neutral-800 text-white flex items-center justify-center font-mono text-xl font-bold flex-shrink-0">
                  {author.initials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/authors/${slug}`}
                      className="font-serif text-xl font-bold hover:text-[#315CF5] transition-colors"
                    >
                      {author.name}
                    </Link>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                      Pending Verification
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#315CF5] mt-0.5 mb-2">
                    {author.role}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {author.bio}
                  </p>
                  <div className="mt-3">
                    <Link
                      to={`/authors/${slug}`}
                      className="text-xs font-semibold text-[#315CF5] hover:underline"
                    >
                      Read articles by {author.name} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
