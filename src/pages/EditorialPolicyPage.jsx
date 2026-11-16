import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Shield, RefreshCw, Cpu, HelpCircle } from "lucide-react";
import SEO from "../components/common/SEO";
import { BRAND_CONFIG } from "../data/initialData";

export default function EditorialPolicyPage() {
  return (
    <div>
      <SEO
        title="Editorial Policy & Verification Standards"
        description="PULSE editorial guidelines: verification protocols, fact-checking methodology, corrections policy, and use of technology in reporting."
        canonicalPath="/editorial-policy"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-8">
          <Link to="/" className="hover:text-[#315CF5]">Home</Link>
          <span>/</span>
          <span className="text-[#171717] dark:text-white font-medium">Editorial Policy</span>
        </nav>

        <header className="mb-12 pb-6 border-b border-[#E5E7EB] dark:border-[#262A36]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315CF5] font-bold block mb-2">
            Journalistic Charter
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#171717] dark:text-white tracking-tight">
            Editorial Policy & Standards
          </h1>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
            How PULSE investigates, reports, verifies, and amends digital journalism across our editorial desks.
          </p>
        </header>

        <div className="space-y-12">
          
          {/* Fact Checking */}
          <section className="flex items-start space-x-4">
            <CheckCircle2 className="w-6 h-6 text-[#315CF5] flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                1. Verification & Fact-Checking
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                We believe readers deserve clear evidence, not uncritical echoes of company press releases. Before publication, factual claims regarding technological performance, medical studies, regulatory actions, and financial data are cross-referenced against primary source documents, patents, regulatory filings, or peer-reviewed journals.
              </p>
            </div>
          </section>

          {/* Sourcing */}
          <section className="flex items-start space-x-4">
            <Shield className="w-6 h-6 text-[#315CF5] flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                2. On-the-Record Sourcing
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                We default to on-the-record sourcing. When anonymous attribution is necessary to protect whistleblowers or vulnerable workers, it requires senior editorial approval, and we communicate to readers why anonymity was granted and why the source possesses firsthand knowledge.
              </p>
            </div>
          </section>

          {/* Corrections */}
          <section id="corrections" className="flex items-start space-x-4">
            <RefreshCw className="w-6 h-6 text-[#315CF5] flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                3. Corrections & Clarifications
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                When a factual mistake occurs, we correct the article text immediately and append an explicit Correction Note at the foot of the story specifying the exact mistake and the date it was amended. We do not silently rewrite errors without reader notification.
              </p>
            </div>
          </section>

          {/* Technology & AI Charter */}
          <section className="flex items-start space-x-4">
            <Cpu className="w-6 h-6 text-[#315CF5] flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                4. Use of AI & Autonomous Tools
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                PULSE reports on artificial intelligence, and we hold our newsroom to strict standards. Articles are conceived, reported, and written by human correspondents. While computational tools may assist in data processing or formatting, autonomous agents never generate unverified bylined editorial copy without explicit human authorship and editorial sign-off.
              </p>
            </div>
          </section>

          {/* Byline Verification */}
          <section className="flex items-start space-x-4">
            <HelpCircle className="w-6 h-6 text-[#315CF5] flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold mb-2">
                5. Contributor Byline Status
              </h2>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                In adherence to our strict transparency protocol, contributor profiles are explicitly labeled as &ldquo;pending editorial verification&rdquo; until complete independent credential validation has occurred. Author archive pages carry <code>noindex</code> directives during the verification phase.
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
