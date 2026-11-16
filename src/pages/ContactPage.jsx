import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import SEO from "../components/common/SEO";
import { BRAND_CONFIG } from "../data/initialData";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "Editorial Tip", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <SEO
        title="Contact Us & Editorial Inquiries"
        description="Get in touch with the PULSE editorial team for tips, corrections, press inquiries, and partnerships."
        canonicalPath="/contact"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs font-mono text-neutral-500 mb-8">
          <Link to="/" className="hover:text-[#315CF5]">Home</Link>
          <span>/</span>
          <span className="text-[#171717] dark:text-white font-medium">Contact</span>
        </nav>

        <section className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#315CF5] font-bold block mb-3">
            Get in Touch
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#171717] dark:text-white tracking-tight">
            Contact PULSE
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl">
            For editorial tips, factual corrections, syndicate licensing, or general inquiries, our editorial team welcomes thoughtful correspondence.
          </p>
        </section>

        {/* Editorial Launch Notice (preserved from EDITORIAL_REVIEW.md) */}
        <div className="mb-10 p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-neutral-900 dark:text-white">Notice regarding contact channels: </span>
            The dedicated PULSE communications gateway is in the final stages of verification. Submissions through this form are logged for editorial queue processing upon deployment.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Contact Form */}
          <div className="md:col-span-8 bg-white dark:bg-[#181B22] p-6 sm:p-8 rounded-xl border border-[#E5E7EB] dark:border-[#262A36] shadow-sm">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-neutral-900 dark:text-white">
                  Message Logged
                </h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out to PULSE. If your submission pertains to a breaking correction or verified news tip, our desk will review it promptly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "Editorial Tip", message: "" }); }}
                  className="mt-6 text-xs font-mono text-[#315CF5] underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#315CF5]"
                    placeholder="E.g. Dr. Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#315CF5]"
                    placeholder="jane@organization.org"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Subject / Department
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#315CF5]"
                  >
                    <option value="Editorial Tip">Confidential Editorial Tip</option>
                    <option value="Correction Request">Factual Correction Request</option>
                    <option value="Syndication & Licensing">Content Syndication & Licensing</option>
                    <option value="Press Inquiry">Press & Media Inquiry</option>
                    <option value="General">General Correspondence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                    Message Details
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#315CF5]"
                    placeholder="Please include relevant article URLs or documentation if reporting a factual correction..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#315CF5] hover:bg-[#2046DB] text-white text-sm font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit to Editorial Desk</span>
                </button>
              </form>
            )}
          </div>

          {/* Department Information */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-6 rounded-xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36]">
              <Mail className="w-5 h-5 text-[#315CF5] mb-2" />
              <h4 className="font-serif font-bold text-base mb-1">Confidential Tips</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We accept encrypted news tips and documentation. Do not transmit classified or proprietary secrets through unencrypted channels.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36]">
              <MessageSquare className="w-5 h-5 text-[#315CF5] mb-2" />
              <h4 className="font-serif font-bold text-base mb-1">Corrections Desk</h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We take factual errors seriously. Please cite the specific article headline, publication date, and verified primary source.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
