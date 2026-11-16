import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { addNewsletterSubscriber } from "../../firebase/firestore";
import { BRAND_CONFIG, INITIAL_CATEGORIES } from "../../data/initialData";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ state: "loading", message: "" });
    try {
      const res = await addNewsletterSubscriber(email);
      setStatus({ state: "success", message: res.message || "Thank you for subscribing!" });
      setEmail("");
    } catch (err) {
      setStatus({ state: "error", message: err.message || "Failed to subscribe. Please try again." });
    }
  };

  return (
    <footer className="bg-[#171717] dark:bg-[#090A0E] text-white pt-16 pb-12 border-t border-neutral-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="border-b border-neutral-800 pb-14 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-wider text-[#315CF5] dark:text-[#4B73FF]">
                The Morning Pulse Dispatch
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-white">
                Clear reporting delivered straight to your inbox.
              </h3>
              <p className="mt-2 text-neutral-400 text-sm max-w-xl">
                Get the ideas, trends, and shifts changing technology, culture, and business every morning. No algorithmic noise, no sponsored fluff.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#315CF5] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status.state === "loading"}
                  className="px-6 py-3 bg-[#315CF5] hover:bg-[#2046DB] text-white text-sm font-semibold flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  <span>{status.state === "loading" ? "Joining..." : "Subscribe"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {status.message && (
                <div className={`mt-2.5 text-xs flex items-center space-x-1 ${status.state === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                  {status.state === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{status.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 text-sm">
          
          {/* Brand Col */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-6 bg-[#315CF5]" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">{BRAND_CONFIG.name}</span>
            </div>
            <p className="mt-4 text-neutral-400 text-sm leading-relaxed max-w-sm">
              {BRAND_CONFIG.description}
            </p>
            <div className="mt-4 text-xs font-mono text-neutral-500">
              Editorial HQ • Established {BRAND_CONFIG.established}
            </div>
          </div>

          {/* Desks Col */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">Editorial Desks</h4>
            <ul className="space-y-2.5 text-neutral-400">
              {INITIAL_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/editorial-policy" className="hover:text-white transition-colors">Editorial Policy</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact & Tips</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-white transition-colors">Search Archive</Link>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-white transition-colors flex items-center space-x-1 text-neutral-500 hover:text-[#315CF5]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="font-serif text-base font-semibold text-white mb-4">Standards & Legal</h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Notice</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/editorial-policy#corrections" className="hover:text-white transition-colors">Corrections</Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-white transition-colors">XML Sitemap</a>
              </li>
              <li>
                <a href="/robots.txt" className="hover:text-white transition-colors">robots.txt</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.name} Media Inc. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0">
            {BRAND_CONFIG.taglineSecondary}
          </div>
        </div>
      </div>
    </footer>
  );
}
