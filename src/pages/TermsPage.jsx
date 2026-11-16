import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { BRAND_CONFIG } from "../data/initialData";

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      <SEO
        title="Terms of Service & Content Syndication"
        description="Terms governing the use of PULSE articles, intellectual property, content syndication, and editorial disclaimers."
        canonicalPath="/terms"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-8">
          <Link to="/" className="hover:text-[#315CF5]">Home</Link>
          <span>/</span>
          <span className="text-[#171717] dark:text-white font-medium">Terms of Service</span>
        </nav>

        <header className="mb-10 pb-6 border-b border-[#E5E7EB] dark:border-[#262A36]">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#171717] dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs font-mono text-neutral-500">
            Last Updated: {currentDate}
          </p>
        </header>

        <div className="editorial-content space-y-6 text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
          <p>
            Welcome to {BRAND_CONFIG.name}. By accessing or browsing our digital publishing platform, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">1. Personal & Non-Commercial Use</h2>
          <p>
            You may read, bookmark, and share links to content published on {BRAND_CONFIG.name} for personal, non-commercial purposes. You may not scrape, systematically harvest, republish, or redistribute our reporting in full without explicit written syndication authorization.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">2. Quotation & Fair Use Policy</h2>
          <p>
            Brief excerpts (up to 75 words) may be quoted in academic works, journalistic reporting, and commentary, provided that prominent attribution is provided with a direct hyperlink back to the original article slug on {BRAND_CONFIG.canonicalHost}.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">3. Accuracy of Editorial Content</h2>
          <p>
            While our correspondents and editors strive for meticulous factual precision, articles reflect reporting and scientific understanding at the time of publication. Scientific research, market data, and regulatory environments evolve rapidly. Content is provided &ldquo;as is&rdquo; without warranties of completeness or fitness for financial/medical decision-making.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">4. Intellectual Property</h2>
          <p>
            All original headlines, commentary, written copy, logos, and editorial graphics are the intellectual property of {BRAND_CONFIG.name} Media and its contributors. All rights reserved.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">5. Inquiries & Licensing</h2>
          <p>
            To request commercial syndication rights or reprint permissions, contact our editorial team via our <Link to="/contact" className="text-[#315CF5] underline">Contact Desk</Link>.
          </p>
        </div>

      </div>
    </div>
  );
}
