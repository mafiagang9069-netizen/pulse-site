import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";
import { BRAND_CONFIG } from "../data/initialData";

export default function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <div>
      <SEO
        title="Privacy Notice & Data Policy"
        description="PULSE privacy policy outlining data collection, analytics standards, subscriber information, and external services."
        canonicalPath="/privacy"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-8">
          <Link to="/" className="hover:text-[#315CF5]">Home</Link>
          <span>/</span>
          <span className="text-[#171717] dark:text-white font-medium">Privacy Policy</span>
        </nav>

        <header className="mb-10 pb-6 border-b border-[#E5E7EB] dark:border-[#262A36]">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#171717] dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-neutral-500">
            Effective Date: {currentDate} • Version 2.0
          </p>
        </header>

        <div className="editorial-content space-y-6 text-sm sm:text-base leading-relaxed text-neutral-800 dark:text-neutral-200">
          <p>
            This Privacy Notice governs your interaction with {BRAND_CONFIG.name} (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;the publication&rdquo;), hosted at {BRAND_CONFIG.canonicalHost}. We believe in minimal data footprinting and complete transparency regarding the information we collect and process.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">1. Information We Collect</h2>
          <p>
            PULSE operates primarily as a public editorial resource. Readers are not required to create accounts or authenticate to access published reporting and analysis.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Newsletter Subscriptions:</strong> If you voluntarily subscribe to the Morning Pulse Dispatch, we collect and store your email address solely to deliver requested editorial updates. You may opt out at any time.
            </li>
            <li>
              <strong>Direct Correspondence:</strong> If you submit an editorial tip or inquiry via our contact channel, we retain the correspondence to evaluate and respond to your communication.
            </li>
            <li>
              <strong>Server Logs:</strong> Standard web server requests automatically record basic technical data such as IP address, browser user-agent, operating system, and request timestamps to maintain security and prevent DDoS abuse.
            </li>
          </ul>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">2. Analytics & Tracking</h2>
          <p>
            We do not sell user data to advertising exchanges, and we do not deploy invasive third-party cross-site behavioural trackers. In accordance with our editorial review standards, placeholder tracking scripts have been eliminated. Any future analytics integration will strictly adhere to privacy-first, cookieless measurement frameworks.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">3. External CDNs and Third-Party Links</h2>
          <p>
            Article imagery may be delivered via Unsplash or Cloud Storage CDNs. Articles frequently cite external primary literature, institutional publications, and scientific papers. Once you navigate away from {BRAND_CONFIG.canonicalHost}, third-party privacy policies apply.
          </p>

          <h2 className="font-serif text-xl sm:text-2xl font-bold mt-8 mb-3">4. Editorial & Privacy Inquiries</h2>
          <p>
            If you have questions regarding data processing or wish to request the removal of a newsletter subscription record, contact our editorial team via our <Link to="/contact" className="text-[#315CF5] underline">Contact Portal</Link>.
          </p>
        </div>

      </div>
    </div>
  );
}
