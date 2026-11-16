import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";

// Public Pages
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import EditorialPolicyPage from "./pages/EditorialPolicyPage";
import AuthorProfilePage from "./pages/AuthorProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

// Admin CMS Pages
import ProtectedRoute from "./admin/components/ProtectedRoute";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminLoginPage from "./admin/pages/AdminLoginPage";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminArticlesList from "./admin/pages/AdminArticlesList";
import AdminArticleEditor from "./admin/pages/AdminArticleEditor";
import AdminCategories from "./admin/pages/AdminCategories";
import AdminSubscribers from "./admin/pages/AdminSubscribers";

export default function App() {
  return (
    <Routes>
      {/* Public Editorial Website */}
      <Route element={<PublicLayout />}>
        {/* 1. Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* 2-9. Dedicated Category Desks */}
        <Route path="/technology" element={<CategoryPage categoryNameOverride="technology" />} />
        <Route path="/business" element={<CategoryPage categoryNameOverride="business" />} />
        <Route path="/science" element={<CategoryPage categoryNameOverride="science" />} />
        <Route path="/health" element={<CategoryPage categoryNameOverride="health" />} />
        <Route path="/finance" element={<CategoryPage categoryNameOverride="finance" />} />
        <Route path="/lifestyle" element={<CategoryPage categoryNameOverride="lifestyle" />} />
        <Route path="/world" element={<CategoryPage categoryNameOverride="world" />} />
        <Route path="/politics" element={<CategoryPage categoryNameOverride="politics" />} />

        {/* Dynamic Category Slugs & Legacy Static HTML Compatibility */}
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/categories/:slug" element={<CategoryPage />} />
        <Route path="/categories/:slug.html" element={<CategoryPage />} />

        {/* 10. Article Detail */}
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
        <Route path="/article/:slug" element={<ArticleDetailPage />} />
        <Route path="/articles/:slug.html" element={<ArticleDetailPage />} />

        {/* 11. Search Results */}
        <Route path="/search" element={<SearchResultsPage />} />

        {/* 12-16. Company & Editorial Legal Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/editorial-policy" element={<EditorialPolicyPage />} />

        {/* 17. Author Profiles */}
        <Route path="/authors/:slug" element={<AuthorProfilePage />} />
        <Route path="/authors/:slug.html" element={<AuthorProfilePage />} />

        {/* 18. 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected Admin CMS Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="articles" element={<AdminArticlesList />} />
        <Route path="articles/new" element={<AdminArticleEditor />} />
        <Route path="articles/edit/:id" element={<AdminArticleEditor />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="subscribers" element={<AdminSubscribers />} />
      </Route>
    </Routes>
  );
}
