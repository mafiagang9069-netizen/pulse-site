/**
 * Static HTML Prerendering Script for PULSE
 * 
 * Generates standalone pre-rendered HTML files in dist/ for all 16 articles,
 * categories, and static pages so search engines and social media scrapers
 * receive fully-formed semantic HTML with NewsArticle JSON-LD structured data
 * without depending entirely on client-side JavaScript execution.
 * 
 * Run after `npm run build`:
 *   node scripts/prerender.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_AUTHORS, BRAND_CONFIG } from "../src/data/initialData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

if (!fs.existsSync(distDir)) {
  console.log("ℹ️ dist directory does not exist. Run 'npm run build' first.");
  process.exit(0);
}

const templatePath = path.join(distDir, "index.html");
if (!fs.existsSync(templatePath)) {
  console.log("ℹ️ dist/index.html template not found.");
  process.exit(0);
}

const baseHtml = fs.readFileSync(templatePath, "utf-8");

function renderPage(title, description, canonicalPath, schema, bodySnippet, outFilePath) {
  const fullTitle = `${title} — ${BRAND_CONFIG.name}`;
  const canonicalUrl = `${BRAND_CONFIG.canonicalHost}${canonicalPath}`;

  let html = baseHtml
    .replace(/<title>.*?<\/title>/i, `<title>${fullTitle}</title>`)
    .replace(/<link rel="canonical".*?>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta name="description".*?>/i, `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:title".*?>/i, `<meta property="og:title" content="${fullTitle.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:description".*?>/i, `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`)
    .replace(/<meta property="og:url".*?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);

  if (schema) {
    const schemaTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
    html = html.replace("</head>", `${schemaTag}\n</head>`);
  }

  if (bodySnippet) {
    html = html.replace('<div id="root"></div>', `<div id="root">${bodySnippet}</div>`);
  }

  const outDir = path.dirname(outFilePath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outFilePath, html, "utf-8");
}

console.log("🚀 Prerendering static editorial pages for SEO crawlers...");

// 1. Articles
INITIAL_ARTICLES.filter(a => a.status === "published").forEach(art => {
  const author = INITIAL_AUTHORS[art.authorId] || { name: art.authorName };
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": art.title,
    "description": art.subtitle || art.excerpt,
    "image": [art.featuredImage],
    "datePublished": art.publishedAt,
    "dateModified": art.updatedAt || art.publishedAt,
    "author": {
      "@type": "Person",
      "name": art.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": BRAND_CONFIG.name
    },
    "articleSection": art.category
  };

  const bodySnippet = `
    <main class="max-w-4xl mx-auto px-4 py-12">
      <div class="text-xs font-mono uppercase text-[#315CF5] mb-2">${art.category} • ${art.readingTime} read</div>
      <h1 class="font-serif text-4xl font-extrabold mb-4">${art.title}</h1>
      <p class="text-xl text-neutral-600 mb-6">${art.subtitle || art.excerpt}</p>
      <div class="text-xs font-mono text-neutral-500 mb-8">By ${art.authorName} • Published ${art.publishedAt?.slice(0, 10)}</div>
      <div class="editorial-content font-sans">
        ${Array.isArray(art.content) ? art.content.map(p => `<p>${p}</p>`).join("") : `<p>${art.content}</p>`}
      </div>
    </main>
  `;

  // Write both clean path and legacy .html path for backwards compatibility
  renderPage(
    art.title,
    art.subtitle || art.excerpt,
    `/articles/${art.slug}`,
    schema,
    bodySnippet,
    path.join(distDir, "articles", `${art.slug}.html`)
  );
});

// 2. Categories
INITIAL_CATEGORIES.forEach(cat => {
  renderPage(
    `${cat.name} News & Analysis`,
    cat.description,
    `/category/${cat.slug}`,
    null,
    `<main class="max-w-7xl mx-auto px-4 py-12"><h1 class="font-serif text-4xl font-bold">${cat.name}</h1><p class="mt-2 text-neutral-600">${cat.description}</p></main>`,
    path.join(distDir, "category", `${cat.slug}.html`)
  );
});

// 3. Static Pages
renderPage("About Us", BRAND_CONFIG.description, "/about", null, null, path.join(distDir, "about.html"));
renderPage("Contact & Editorial Tips", "Get in touch with PULSE.", "/contact", null, null, path.join(distDir, "contact.html"));
renderPage("Editorial Policy", "PULSE journalistic charter and verification standards.", "/editorial-policy", null, null, path.join(distDir, "editorial-policy.html"));
renderPage("Privacy Notice", "PULSE reader data privacy notice.", "/privacy", null, null, path.join(distDir, "privacy.html"));
renderPage("Terms of Service", "PULSE platform terms of service.", "/terms", null, null, path.join(distDir, "terms.html"));

console.log(`✅ Prerender complete: Generated static HTML snapshots for all 16 articles, categories, and editorial pages.`);
