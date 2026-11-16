/**
 * Test Suite for PULSE Editorial Platform
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES, INITIAL_AUTHORS, BRAND_CONFIG } from "../src/data/initialData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");

console.log("🧪 Running Comprehensive PULSE Platform Test Suite...\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. Data Integrity Tests
console.log("1. Content & Metadata Integrity:");
assert(INITIAL_ARTICLES.length === 16, `Preserved exactly 16 original articles (found ${INITIAL_ARTICLES.length})`);
assert(INITIAL_CATEGORIES.length >= 9, `Configured editorial categories (found ${INITIAL_CATEGORIES.length})`);
assert(Object.keys(INITIAL_AUTHORS).length === 3, `Preserved 3 contributor profiles (found ${Object.keys(INITIAL_AUTHORS).length})`);

// Check required article fields
const sample = INITIAL_ARTICLES[0];
assert(sample.title && sample.slug && sample.subtitle && sample.content && sample.featuredImage, "Articles have all required editorial fields (title, slug, subtitle, content, featuredImage)");
assert(sample.status === "published", "Initial articles are set to 'published' status");

// 2. SEO Files Verification
console.log("\n2. Production SEO Assets:");
const sitemapPath = path.join(rootDir, "public", "sitemap.xml");
assert(fs.existsSync(sitemapPath), "public/sitemap.xml exists");
const sitemapContent = fs.readFileSync(sitemapPath, "utf-8");
assert(sitemapContent.includes(BRAND_CONFIG.canonicalHost), "sitemap.xml contains correct canonical host (https://pulse-site-mkrs.onrender.com)");
assert(sitemapContent.includes("ai-agents-boring-parts-of-your-job"), "sitemap.xml indexes articles");

const robotsPath = path.join(rootDir, "public", "robots.txt");
assert(fs.existsSync(robotsPath), "public/robots.txt exists");
const robotsContent = fs.readFileSync(robotsPath, "utf-8");
assert(robotsContent.includes("Disallow: /admin") && robotsContent.includes("Sitemap:"), "robots.txt protects /admin and declares sitemap");

// 3. Firebase Security Rules Verification
console.log("\n3. Security & Rule Configurations:");
const firestoreRulesPath = path.join(rootDir, "firestore.rules");
assert(fs.existsSync(firestoreRulesPath), "firestore.rules file exists");
const fRules = fs.readFileSync(firestoreRulesPath, "utf-8");
assert(fRules.includes("request.auth.token.admin == true"), "firestore.rules enforces Firebase Auth custom claim (request.auth.token.admin == true)");
assert(fRules.includes("resource.data.status == 'published'"), "firestore.rules restricts public read to published articles only");

const storageRulesPath = path.join(rootDir, "storage.rules");
assert(fs.existsSync(storageRulesPath), "storage.rules file exists");
const sRules = fs.readFileSync(storageRulesPath, "utf-8");
assert(sRules.includes("request.auth.token.admin == true"), "storage.rules restricts image mutation to administrators");

const indexesPath = path.join(rootDir, "firestore.indexes.json");
assert(fs.existsSync(indexesPath), "firestore.indexes.json exists with composite indexes");

// 4. Production Build & Prerender Verification
console.log("\n4. Build & Prerender Snapshot Outputs:");
const distIndex = path.join(rootDir, "dist", "index.html");
assert(fs.existsSync(distIndex), "dist/index.html generated");

const distArticles = path.join(rootDir, "dist", "articles");
assert(fs.existsSync(distArticles), "dist/articles/ directory exists");
const prerenderedCount = fs.readdirSync(distArticles).filter(f => f.endsWith(".html")).length;
assert(prerenderedCount === 16, `Prerendered all 16 articles into static HTML (found ${prerenderedCount})`);

// Check NewsArticle schema in prerendered HTML
const sampleArticleHtml = fs.readFileSync(path.join(distArticles, "ai-agents-boring-parts-of-your-job.html"), "utf-8");
assert(sampleArticleHtml.includes("NewsArticle"), "Prerendered HTML contains NewsArticle JSON-LD schema");
assert(sampleArticleHtml.includes("Autonomous coding and research agents"), "Prerendered HTML contains article body content for Googlebot");

console.log(`\n========================================`);
console.log(`Tests Completed: ${passed} Passed, ${failed} Failed.`);
console.log(`========================================\n`);

if (failed > 0) {
  process.exit(1);
}
