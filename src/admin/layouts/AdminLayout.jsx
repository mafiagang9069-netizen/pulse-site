import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, FileText, PlusCircle, FolderKanban, 
  Users, Database, ExternalLink, LogOut, Moon, Sun, 
  Menu, X, ShieldCheck, Flame, Bell, CheckCircle2 
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { BRAND_CONFIG } from "../../data/initialData";

export default function AdminLayout() {
  const { currentUser, logout, isFirebaseConfigured, devBypassMode } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Articles", path: "/admin/articles", icon: FileText },
    { name: "New Article", path: "/admin/articles/new", icon: PlusCircle },
    { name: "Desks / Categories", path: "/admin/categories", icon: FolderKanban },
    { name: "Subscribers", path: "/admin/subscribers", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#0B0D12] text-neutral-900 dark:text-neutral-100 flex flex-col transition-colors duration-200">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-white dark:bg-[#12151D] border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-6 h-16 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/admin" className="flex items-center space-x-2.5">
            <span className="w-2 h-6 bg-[#315CF5]" />
            <span className="font-serif text-xl font-bold tracking-tight text-[#171717] dark:text-white">
              {BRAND_CONFIG.name}
            </span>
            <span className="bg-[#315CF5]/10 text-[#315CF5] dark:text-[#6085FF] text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded">
              Editorial CMS
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          {/* Live Site Link */}
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center space-x-2 pl-3 border-l border-neutral-200 dark:border-neutral-800">
            <div className="w-7 h-7 rounded-full bg-[#171717] dark:bg-neutral-800 text-white flex items-center justify-center font-mono text-xs font-bold">
              {currentUser?.email ? currentUser.email[0].toUpperCase() : "A"}
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold leading-tight truncate max-w-[140px]">
                {currentUser?.email || "Editor"}
              </div>
              <div className="text-[10px] font-mono text-emerald-500 font-medium">
                Admin Verified
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-neutral-500 hover:text-rose-600 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-[#12151D] border-r border-neutral-200 dark:border-neutral-800 transform md:transform-none md:static transition-transform duration-200 flex flex-col justify-between pt-16 md:pt-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 space-y-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 px-3 mb-2">
                Publishing Desks
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-[#315CF5] text-white shadow-sm font-semibold"
                          : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-black dark:hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <Link
                to="/admin/articles/new"
                onClick={() => setSidebarOpen(false)}
                className="w-full py-2.5 px-4 bg-[#315CF5]/10 hover:bg-[#315CF5]/20 text-[#315CF5] dark:text-[#6085FF] text-xs font-mono uppercase tracking-wider font-bold rounded-lg flex items-center justify-center space-x-2 transition-colors border border-[#315CF5]/20"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Compose Story</span>
              </Link>
            </div>
          </div>

          {/* System Environment Status Pill */}
          <div className="p-4 m-3 rounded-xl bg-neutral-50 dark:bg-[#181B22] border border-neutral-200 dark:border-neutral-800 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[10px] uppercase text-neutral-500">Database</span>
              <span className="flex items-center space-x-1 text-emerald-500 font-bold text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isFirebaseConfigured ? "Firestore Live" : "Active"}</span>
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 leading-normal">
              {isFirebaseConfigured 
                ? "Connected to Cloud Firestore & Storage."
                : devBypassMode
                ? "Running with verified seed dataset."
                : "Firebase project connected."}
            </p>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
          />
        )}

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
