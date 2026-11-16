/**
 * Dynamic XML Sitemap Generator for PULSE
 * Output: public/sitemap.xml
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, BRAND_CONFIG } from "../src/data/initialData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const baseUrl = BRAND_CONFIG.canonicalHost;

// Static editorial routes
const staticRoutes = [
  { url: "/", priority: "1.0", changefreq: "daily" },
  { url: "/about", priority: "0.7", changefreq: "monthly" },
  { url: "/editorial-policy", priority: "0.7", changefreq: "monthly" },
  { url: "/contact", priority: "0.6", changefreq: "monthly" },
  { url: "/privacy", priority: "0.5", changefreq: "yearly" },
  { url: "/terms", priority: "0.5", changefreq: "yearly" }
];

// Category routes
const categoryRoutes = INITIAL_CATEGORIES.map(cat => ({
  url: `/category/${cat.slug}`,
  priority: "0.8",
  changefreq: "daily"
}));

// Article routes (only published articles!)
const articleRoutes = INITIAL_ARTICLES.filter(a => a.status === "published").map(art => ({
  url: `/articles/${art.slug}`,
  lastmod: (art.updatedAt || art.publishedAt || "").slice(0, 10),
  priority: art.featured ? "0.9" : "0.8",
  changefreq: "weekly"
}));

const allUrls = [...staticRoutes, ...categoryRoutes, ...articleRoutes];

const xmlEntries = allUrls.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    ${item.lastmod ? `<lastmod>${item.lastmod}</lastmod>` : ""}
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join("\n");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemapXml, "utf-8");
console.log(`✅ Sitemap successfully written to public/sitemap.xml (${allUrls.length} indexed URLs)`);
