import React, { useEffect } from "react";
import { BRAND_CONFIG } from "../../data/initialData";

/**
 * SEO & Structured Data Head Manager
 */
export default function SEO({
  title,
  description,
  canonicalPath = "",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  category,
  noIndex = false,
  schema = null
}) {
  const fullTitle = title ? `${title} — ${BRAND_CONFIG.name}` : `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`;
  const fullDescription = description || BRAND_CONFIG.description;
  const canonicalUrl = `${BRAND_CONFIG.canonicalHost}${canonicalPath}`;
  const defaultImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85";
  const ogImage = image || defaultImage;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper to set or create meta tag
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Helper to set or create link tag
    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Standard Meta
    setMeta("name", "description", fullDescription);
    setMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow");
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", fullDescription);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", BRAND_CONFIG.name);

    // Twitter Card
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", fullDescription);
    setMeta("name", "twitter:image", ogImage);

    // Article Specific Meta
    if (type === "article") {
      if (publishedTime) setMeta("property", "article:published_time", publishedTime);
      if (modifiedTime) setMeta("property", "article:modified_time", modifiedTime);
      if (author) setMeta("property", "article:author", author);
      if (category) setMeta("property", "article:section", category);
    }

    // JSON-LD Structured Data
    let scriptTag = document.getElementById("pulse-json-ld");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "pulse-json-ld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": BRAND_CONFIG.name,
      "url": BRAND_CONFIG.canonicalHost,
      "description": BRAND_CONFIG.taglineSecondary,
      "logo": `${BRAND_CONFIG.canonicalHost}/images/pulse-logo.png`
    };

    scriptTag.textContent = JSON.stringify(schema || defaultSchema);

    // Cleanup on unmount or page change
    return () => {
      // Keep title clean on route changes
    };
  }, [fullTitle, fullDescription, canonicalUrl, ogImage, type, publishedTime, modifiedTime, author, category, noIndex, schema]);

  return null;
}
