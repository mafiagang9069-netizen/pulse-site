import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Info, Sparkles } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import SEO from "../../components/common/SEO";
import { BRAND_CONFIG } from "../../data/initialData";

export default function AdminLoginPage() {
  const { login, isFirebaseConfigured, devBypassMode, enableDevBypass } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failure:", err);
      setError(err.message || "Failed to sign in. Please verify your credentials.");
      setLoading(false);
    }
  };

  const handleDevPreview = () => {
    enableDevBypass();
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0F1115] text-[#171717] dark:text-[#F3F4F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SEO
        title="Admin CMS Authentication"
        description="Secure editorial login portal for PULSE administrators and contributing editors."
        canonicalPath="/admin/login"
        noIndex={true}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center space-x-2.5 mb-4 group">
          <span className="w-3 h-8 bg-[#315CF5] group-hover:scale-y-110 transition-transform" />
          <span className="font-serif text-3xl font-extrabold tracking-tight text-[#171717] dark:text-white">
            {BRAND_CONFIG.name}
          </span>
        </Link>
        <h2 className="font-serif text-2xl font-bold tracking-tight text-[#171717] dark:text-white">
          Editorial CMS Portal
        </h2>
        <p className="mt-1 text-xs font-mono uppercase tracking-wider text-neutral-500">
          Staff & Administrator Access Only
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#181B22] py-8 px-6 sm:px-10 shadow-lg rounded-2xl border border-[#E5E7EB] dark:border-[#262A36]">
          
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="editor@pulse-media.internal"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#315CF5]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-600 dark:text-neutral-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#FAFAF8] dark:bg-[#0F1115] border border-neutral-300 dark:border-neutral-700 text-sm focus:outline-none focus:border-[#315CF5]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#315CF5] hover:bg-[#2046DB] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors shadow-sm disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to CMS"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Local Evaluation Mode (if Firebase is not yet configured) */}
          {!isFirebaseConfigured && (
            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
              <div className="p-4 rounded-xl bg-[#F1F2F4] dark:bg-[#12141A] border border-neutral-200 dark:border-neutral-800 text-center">
                <div className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#315CF5]" />
                  <span>Evaluation & Local Testing</span>
                </div>
                <p className="text-[11px] text-neutral-500 mb-3 leading-relaxed">
                  Evaluate the complete editorial publishing CMS, article editor, and migration dashboard immediately:
                </p>
                <button
                  onClick={handleDevPreview}
                  className="w-full py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-mono uppercase tracking-wider font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Launch Local CMS Preview
                </button>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="mt-6 flex items-start space-x-2 text-[11px] text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-[#315CF5] flex-shrink-0 mt-0.5" />
            <span>
              Public registration is disabled. Administrator roles are verified via custom claims and Firestore security rules.
            </span>
          </div>

        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs font-mono text-neutral-500 hover:text-[#315CF5] transition-colors">
            &larr; Return to PULSE Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
