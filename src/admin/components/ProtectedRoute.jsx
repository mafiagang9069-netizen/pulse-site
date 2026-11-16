import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShieldAlert, KeyRound, ArrowRight } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { currentUser, isAdmin, loading, isFirebaseConfigured, devBypassMode, enableDevBypass } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] dark:bg-[#0F1115]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#315CF5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
            Authenticating PULSE Admin Session...
          </p>
        </div>
      </div>
    );
  }

  // If user is logged in and authorized as admin, allow access
  if (currentUser && isAdmin) {
    return children;
  }

  // If Firebase is not configured yet, show a clear guidance panel instead of a generic blank redirect
  if (!isFirebaseConfigured && !devBypassMode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8] dark:bg-[#0F1115] p-4">
        <div className="max-w-md w-full bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] rounded-2xl p-8 shadow-xl text-center">
          <div className="w-12 h-12 rounded-full bg-[#315CF5]/10 text-[#315CF5] flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold mb-2">Admin Authentication</h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
            Firebase credentials are not yet configured in your <code>.env</code> file. To test the Admin CMS interface locally, you can enable Local Preview Mode or configure your Firebase project.
          </p>
          <div className="space-y-3">
            <button
              onClick={enableDevBypass}
              className="w-full py-2.5 px-4 bg-[#315CF5] hover:bg-[#2046DB] text-white text-xs font-mono uppercase tracking-wider font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Enable Local Admin Preview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href="/admin/login"
              className="block text-xs font-mono text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
            >
              Go to Standard Login Page &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise redirect to admin login
  return <Navigate to="/admin/login" state={{ from: location }} replace />;
}
