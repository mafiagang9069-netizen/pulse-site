import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Sun, Moon, Menu, X, ChevronDown, ShieldCheck, User } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { BRAND_CONFIG, INITIAL_CATEGORIES } from "../../data/initialData";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isAdmin, currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const mainCategories = [
    { name: "Technology", slug: "technology" },
    { name: "Business", slug: "business" },
    { name: "Science", slug: "science" },
    { name: "Health", slug: "health" },
    { name: "Finance", slug: "finance" },
    { name: "Lifestyle", slug: "lifestyle" },
    { name: "World", slug: "world" },
    { name: "Politics", slug: "politics" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 dark:bg-[#0F1115]/95 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#262A36] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="group flex items-center space-x-2.5">
              <span className="w-2.5 h-8 bg-[#315CF5] rounded-none group-hover:scale-y-110 transition-transform duration-200" />
              <div className="flex flex-col">
                <span className="font-serif text-3xl font-extrabold tracking-tight text-[#171717] dark:text-white">
                  {BRAND_CONFIG.name}
                </span>
                <span className="hidden sm:inline-block text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400 -mt-1">
                  {BRAND_CONFIG.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition-colors duration-150 ${
                  isActive
                    ? "text-[#315CF5] font-semibold"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-[#171717] dark:hover:text-white"
                }`
              }
            >
              Home
            </NavLink>

            {/* Quick Categories */}
            {mainCategories.slice(0, 5).map((cat) => (
              <NavLink
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className={({ isActive }) =>
                  `transition-colors duration-150 ${
                    isActive
                      ? "text-[#315CF5] font-semibold"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-[#171717] dark:hover:text-white"
                  }`
                }
              >
                {cat.name}
              </NavLink>
            ))}

            {/* More Topics Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                onBlur={() => setTimeout(() => setCategoriesDropdownOpen(false), 200)}
                className="flex items-center space-x-1 text-neutral-700 dark:text-neutral-300 hover:text-[#171717] dark:hover:text-white py-2"
                aria-expanded={categoriesDropdownOpen}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-[#181B22] border border-[#E5E7EB] dark:border-[#262A36] rounded-md shadow-xl py-2 z-50 animate-fade-in">
                  <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400 border-b border-neutral-100 dark:border-neutral-800">
                    All Desks
                  </div>
                  {INITIAL_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm text-neutral-800 dark:text-neutral-200 hover:bg-[#F1F2F4] dark:hover:bg-[#222632] hover:text-[#315CF5]"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="border-t border-neutral-100 dark:border-neutral-800 my-1"></div>
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-[#F1F2F4] dark:hover:bg-[#222632]"
                  >
                    About PULSE
                  </Link>
                  <Link
                    to="/editorial-policy"
                    className="block px-4 py-2 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-[#F1F2F4] dark:hover:bg-[#222632]"
                  >
                    Editorial Standards
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `transition-colors duration-150 ${
                  isActive
                    ? "text-[#315CF5] font-semibold"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-[#171717] dark:hover:text-white"
                }`
              }
            >
              About
            </NavLink>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <Link
              to="/search"
              aria-label="Search stories"
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-[#171717] dark:hover:text-white hover:bg-[#F1F2F4] dark:hover:bg-[#1E222D] rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-[#171717] dark:hover:text-white hover:bg-[#F1F2F4] dark:hover:bg-[#1E222D] rounded-full transition-colors"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-neutral-700" />}
            </button>

            {/* Admin Access Pill */}
            {isAdmin ? (
              <Link
                to="/admin"
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[#315CF5]/10 text-[#315CF5] dark:text-[#6085FF] border border-[#315CF5]/20 hover:bg-[#315CF5]/20 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin CMS</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="hidden md:inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <span>Staff</span>
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] dark:border-[#262A36] bg-[#FAFAF8] dark:bg-[#0F1115] px-4 pt-3 pb-6 space-y-4 animate-fade-in shadow-xl">
          <div className="text-xs font-mono uppercase text-neutral-400 tracking-wider mb-2">
            Editorial Sections
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            {INITIAL_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded hover:bg-[#F1F2F4] dark:hover:bg-[#181B22] text-neutral-800 dark:text-neutral-200"
              >
                {cat.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#E5E7EB] dark:border-[#262A36] pt-3 flex flex-col space-y-2 text-sm">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-700 dark:text-neutral-300"
            >
              About PULSE
            </Link>
            <Link
              to="/editorial-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-700 dark:text-neutral-300"
            >
              Editorial Policy
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-700 dark:text-neutral-300"
            >
              Contact & Inquiries
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#315CF5] font-semibold flex items-center space-x-1"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin CMS Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
