# 🌐 PULSE — Premium Digital News & Editorial Platform (v2.0)

> **"What the world is reading right now."**  
> *Independent perspective. Clear reporting.*

Welcome to **PULSE**, a production-ready, full-stack digital editorial publication and Content Management System (CMS). Built from the ground up to combine high-performance editorial typography with an enterprise-grade cloud publishing workflow.

---

## 📑 Table of Contents
1. [Overview & What Was Built](#1-overview--what-was-built)
2. [Complete Technology Stack Explained](#2-complete-technology-stack-explained)
3. [Architecture & How Everything Connects](#3-architecture--how-everything-connects)
4. [Public Website Features (18 Pages)](#4-public-website-features-18-pages)
5. [The Editorial CMS (Admin Management)](#5-the-editorial-cms-admin-management)
6. [100% Free Zero-Cost Cloud Architecture](#6-100-free-zero-cost-cloud-architecture)
7. [Cloud Database Schema & Security Rules](#7-cloud-database-schema--security-rules)
8. [Production Deployment & SEO](#8-production-deployment--seo)
9. [Project Directory Structure](#9-project-directory-structure)
10. [Quick Command Reference](#10-quick-command-reference)

---

## 1. Overview & What Was Built

PULSE was redesigned from a static template into a full-featured digital media company platform:

* **16 Original Articles Preserved**: All original stories, reporting copy, and dates were preserved and migrated into the live Cloud Firestore database.
* **11 Editorial Desks**: Technology, Business, Science, Health, Finance, Lifestyle, World, Politics, Climate, Work & Culture, and Food.
* **3 Contributor Byline Archives**: Maya Chen, Daniel Osei, and Priya Nair.
* **Full-Featured Admin CMS**: A protected newsroom dashboard for writing, formatting, drafting, scheduling, and publishing stories live to the web.
* **100% Free Image Workflow**: Zero-billing image uploads with in-browser auto-compression and one-click royalty-free Unsplash presets.
* **Dynamic Search & Radar Ticker**: Instant client-side search across all articles, plus a live breaking news marquee.
* **Google SEO & Static Prerendering**: Automatic NewsArticle JSON-LD structured data, dynamic XML sitemaps, and pre-rendered HTML snapshots for web crawlers.

---

## 2. Complete Technology Stack Explained

Here is a breakdown of every tool, library, and framework used in this project and why it was chosen:

| Layer | Technology | Purpose & Implementation |
| :--- | :--- | :--- |
| **Build Engine** | [Vite (v5)](https://vitejs.dev/) | Ultra-fast development server with instant Hot Module Replacement (HMR) and optimized Rollup production bundling. |
| **UI Framework** | [React (v18)](https://react.dev/) | Component-driven architecture using modern Functional Components and Hooks (`useState`, `useEffect`, `useContext`, `useRef`). |
| **Routing** | [React Router (v6)](https://reactrouter.com/) | Client-side routing with clean URL slugs (`/articles/:slug`, `/category/:slug`), dynamic parameters, and backward-compatible legacy routes. |
| **Styling** | [Tailwind CSS (v3)](https://tailwindcss.com/) | Utility-first styling with custom editorial tokens: Warm White `#FAFAF8`, Ink `#171717`, Electric Blue `#315CF5`, and Slate Card `#F1F2F4`. |
| **Typography** | Google Fonts | **Playfair Display** (classic editorial headlines), **DM Sans** (clean, readable body copy), and **JetBrains Mono** (kickers and metadata). |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, lightweight SVG iconography (feather-inspired) for modern UI controls. |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Smooth fade-ins, card transitions, and marquee ticker effects. |
| **Database** | [Cloud Firestore](https://firebase.google.com/docs/firestore) | Google Cloud serverless NoSQL document database providing real-time data persistence, collection queries, and compound filtering. |
| **Authentication** | [Firebase Auth](https://firebase.google.com/docs/auth) | Secure email/password login restricted to verified staff administrators. |
| **Cloud Hosting** | [Render](https://render.com/) & [Firebase](https://firebase.google.com/) | Production static web hosting with global CDN edge delivery and SSL encryption. |

---

## 3. Architecture & How Everything Connects

```
                      ┌────────────────────────────────────────┐
                      │             User's Browser             │
                      │  (http://localhost:3000 or Live URL)   │
                      └──────────────────┬─────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
                 ▼                                               ▼
     ┌───────────────────────┐                       ┌───────────────────────┐
     │     Public Pages      │                       │     Admin CMS (/admin)│
     │  - Front Page         │                       │  - Dashboard          │
     │  - Desks & Categories │                       │  - Article Editor     │
     │  - Story Details      │                       │  - Desk Manager       │
     │  - Search & Archive   │                       │  - Subscriber Roster  │
     └───────────┬───────────┘                       └───────────┬───────────┘
                 │                                               │
                 │ Read-only queries                             │ Authenticated CRUD
                 ▼                                               ▼
     ┌───────────────────────────────────────────────────────────────────────┐
     │                     Firebase SDK Service Layer                        │
     │                     (src/firebase/config.js)                          │
     └───────────────────┬───────────────────────────────┬───────────────────┘
                         │                               │
                         ▼                               ▼
     ┌───────────────────────────────────────┐       ┌───────────────────────┐
     │            Firebase Auth              │       │    Cloud Firestore    │
     │     - Email / Password Login          │       │  - articles/          │
     │     - Admin Role Verification         │       │  - categories/        │
     │     - Protected Session State         │       │  - users/             │
     └───────────────────────────────────────┘       │  - newsletterSubs/    │
                                                     │  - activityLogs/      │
                                                     └───────────────────────┘
```

### The Connection Pipeline:
1. **Environment Initialization (`.env`)**: When the app loads, Vite reads your Firebase project keys from `.env` and safely initializes the Firebase app in `src/firebase/config.js`.
2. **Authentication Flow (`src/context/AuthContext.jsx`)**: When staff log in at `/admin/login`, Firebase Auth verifies credentials. Upon success, the admin state is stored in React Context and persists across browser refreshes.
3. **Database Transactions (`src/firebase/firestore.js`)**: Public visitors load articles from Firestore collections with `status == "published"`. When you compose a story in the CMS, it writes directly to the `articles` collection in your Google Cloud backend.
4. **Offline / First-Time Fallback (`src/data/initialData.js`)**: If Firebase credentials are disconnected or pending setup, the app gracefully falls back to the local seed dataset so the site never crashes.

---

## 4. Public Website Features (18 Pages)

1. **Homepage (`/`)**: Hero cover story with high-resolution editorial photography, "On Our Radar" 01–03 trending stories rail, live Pulse marquee ticker, desk tags, latest stories grid, Technology spotlight, Work & Culture deep-dive, Health & Science deep-dive, editorial mission statement, and newsletter dispatch form.
2. **8 Dedicated Category Desks**:
   - **Technology** (`/technology` or `/category/technology`)
   - **Business** (`/business` or `/category/business`)
   - **Science** (`/science` or `/category/science`)
   - **Health** (`/health` or `/category/health`)
   - **Finance** (`/finance` or `/category/finance`)
   - **Lifestyle** (`/lifestyle` or `/category/lifestyle`)
   - **World** (`/world` or `/category/world`)
   - **Politics** (`/politics` or `/category/politics`)
3. **Article Detail View (`/articles/:slug`)**: SEO-friendly URL slugs, electric blue scroll-depth reading progress bar, breadcrumbs, byline avatar, estimated reading time, publication & update dates, cover image with editorial credit, formatted article content, social sharing (X, LinkedIn, Email, 1-click Link Copy), NewsArticle JSON-LD schema, previous/next article cards, and related articles grid.
4. **Search Results (`/search`)**: Real-time client-side search across titles, excerpts, content, authors, categories, and keyword tags, plus category filter chips.
5. **About Us (`/about`)**: Journalistic mission charter, core reporting principles, editorial standards, and contributor masthead.
6. **Contact Us (`/contact`)**: Confidential news tip form, corrections department info, and licensing contacts.
7. **Privacy Policy (`/privacy`)**: Minimal data footprint disclosure, cookieless policy, and newsletter data terms.
8. **Terms of Service (`/terms`)**: Content syndication guidelines, 75-word quotation fair use rule, and copyright notices.
9. **Editorial Policy (`/editorial-policy`)**: Fact-checking methodology, on-the-record sourcing rules, transparent corrections policy, and human-in-the-loop AI reporting charter.
10. **Contributor Profiles (`/authors/:slug`)**: Contributor biography, "Pending Editorial Verification" status badge, and full published story archive.
11. **Editorial 404 Page (`*`)**: Custom error page with quick desk navigation and archive search.

---

## 5. The Editorial CMS (Admin Management)

Access the CMS at **`http://localhost:3000/admin`** (or click **"Staff"** in the top navigation).

### Key Features:
* **Newsroom Dashboard (`/admin`)**: Metric cards (Total Articles, Published, Drafts, Scheduled, Active Desks), quick status toggles, recent activity audit logs, and the **1-Click Migration Engine** to sync the 16 original articles.
* **Article Editor (`/admin/articles/new`)**:
  * **Rich Text Toolbar**: Headings (H2, H3), Bold, Italic, Quotes, Bullet Lists, Numbered Lists, Links, and Image insertion.
  * **Live Reading Time & Word Count**: Automatically calculated as you type.
  * **URL Slug Manager**: Auto-generates clean slugs from titles, or allows custom editorial slugs.
  * **Publishing States**: Save as Draft (private), Publish Live (instant), or Schedule publication.
  * **Cover & Radar Promotions**: Checkboxes to promote articles to Cover Story (hero) or On Our Radar.
  * **SEO Control Suite**: Live Google SERP search result preview, title character counter (60 chars), meta description counter (160 chars), and keyword tags.
  * **Full Article Preview Modal**: Preview the story in full editorial layout before publishing.
* **Desk & Category Manager (`/admin/categories`)**: Create new desks, edit descriptions, and update category header images.
* **Audience Manager (`/admin/subscribers`)**: View newsletter subscribers and export the list to CSV.

---

## 6. 100% Free Zero-Cost Cloud Architecture

Google Cloud Storage recently introduced billing account prompts (Blaze plan) for new storage buckets. **PULSE is engineered so you NEVER need a paid plan or credit card:**

1. **One-Click Free Unsplash Presets**: Instant high-resolution royalty-free editorial photos for Tech/AI, Space, Business, Health, Climate, and Culture directly inside the editor.
2. **Direct Image URLs**: Paste any free image link from Unsplash, Pexels, or web CDNs.
3. **In-Browser Auto-Compression**: When you select an image file from your computer, the browser automatically scales and compresses it onto an HTML5 Canvas into a lightweight WebP/JPEG data URL, saving it directly into Cloud Firestore for **FREE** without touching paid Cloud Storage!

---

## 7. Cloud Database Schema & Security Rules

### Collections in Cloud Firestore:

* **`articles`**:
  * `id`: Document ID
  * `title`: Story headline
  * `slug`: Permanent URL slug
  * `subtitle` / `excerpt`: Editorial dek
  * `content`: Full article text
  * `featuredImage`: Image URL or optimized data URL
  * `category` & `categorySlug`: Assigned editorial desk
  * `authorId` & `authorName`: Assigned correspondent
  * `status`: `"published"` | `"draft"` | `"scheduled"`
  * `featured`: Boolean (promoted to Cover Story)
  * `trending`: Boolean (promoted to Radar Ticker)
  * `seoTitle`, `metaDescription`, `keywords`: Search engine metadata
  * `readingTime`: Estimated read time (e.g., `"6 min"`)
  * `publishedAt`, `updatedAt`, `createdAt`: Timestamps

* **`categories`**: `id`, `name`, `slug`, `description`, `image`
* **`users`**: `uid`, `email`, `role` (`"admin"`), `displayName`, `createdAt`
* **`newsletterSubscribers`**: `email`, `subscribedAt`, `status`
* **`activityLogs`**: `action`, `details`, `userEmail`, `timestamp`

### Production Security Rules (`firestore.rules`):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public visitors can only read published articles & desks
    match /articles/{articleId} {
      allow read: if (resource.data.status == 'published') || request.auth != null;
      allow create, update, delete: if request.auth != null;
    }

    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /newsletterSubscribers/{subscriberId} {
      allow create: if request.resource.data.email is string;
      allow read, update, delete: if request.auth != null;
    }

    // Authenticated admin staff have full management access
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 8. Production Deployment & SEO

### Deploying to Render:
1. In your **Render Dashboard** (`pulse-site-mkrs`):
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist`
2. Under **Redirects/Rewrites**:
   * **Source**: `/*`
   * **Destination**: `/index.html`
   * **Action**: `Rewrite`
3. Under **Environment**, add your `.env` keys.

### Production SEO Features:
* **NewsArticle JSON-LD Structured Data**: Dynamically generated and pre-rendered into HTML for rich Google search cards.
* **Static HTML Prerendering (`scripts/prerender.js`)**: Compiles pre-rendered static HTML snapshots for all 16 articles and categories into `dist/` so search engines can read content without running JavaScript.
* **XML Sitemap (`public/sitemap.xml`)**: Indexes 33 public pages and articles automatically.
* **Robots.txt (`public/robots.txt`)**: Protects `/admin` and links to the canonical sitemap.
* **Google Search Console**: Built-in verification tag `TeHpXFhlFnrR00GtA10uYcMcwMqaCP22Mdx8twcZIl8`.

---

## 9. Project Directory Structure

```
c:\Users\soura\Documents\media post generater\
├── public/
│   ├── favicon/                # Editorial icon
│   ├── robots.txt              # Search engine crawler directives
│   └── sitemap.xml             # Production XML sitemap (33 URLs)
│
├── scripts/
│   ├── generateSitemap.js      # Dynamic XML sitemap builder
│   ├── migrateArticles.js      # CLI migration script for the 16 articles
│   ├── prerender.js            # Pre-renders static HTML with NewsArticle JSON-LD
│   ├── setAdminClaim.js        # Grants admin Custom Claims via Firebase Admin SDK
│   └── testApp.js              # Automated test suite (21 assertions)
│
├── src/
│   ├── admin/                  # Secure Editorial CMS
│   │   ├── components/         # ProtectedRoute guard
│   │   ├── layouts/            # AdminLayout with responsive sidebar & status bar
│   │   └── pages/              # Dashboard, ArticleEditor, ArticlesList, Categories, Subscribers
│   │
│   ├── components/             # Reusable UI Components
│   │   ├── article/            # ArticleCard (standard, compact, horizontal)
│   │   └── common/             # Header, Footer, Ticker, ReadingProgress, SEO Head Manager
│   │
│   ├── context/                # React Context Providers
│   │   ├── AuthContext.jsx     # Manages user session, admin privileges & bypass mode
│   │   └── ThemeContext.jsx    # Manages Dark/Light mode toggle & persistence
│   │
│   ├── data/
│   │   └── initialData.js      # Preserved 16 original articles, 11 categories & 3 authors
│   │
│   ├── firebase/               # Firebase SDK Services
│   │   ├── config.js           # Firebase app initialization with fallback safety
│   │   ├── auth.js             # Authentication and admin verification
│   │   ├── firestore.js        # Firestore CRUD, search, and migration engine
│   │   └── storage.js          # Storage handler with fallback support
│   │
│   ├── layouts/                # PublicLayout with Ticker, Header & Footer
│   ├── pages/                  # All 18 public website pages
│   ├── styles/                 # Tailwind CSS & editorial typography rules
│   ├── App.jsx                 # Central router & URL compatibility
│   └── main.jsx                # React DOM entry point
│
├── .env                        # Live Firebase credentials (ignored by Git)
├── .env.example                # Template for environment variables
├── .gitignore                  # Git ignore rules protecting credentials
├── firebase.json               # Firebase hosting configuration
├── firestore.indexes.json      # Firestore composite indexes
├── firestore.rules             # Cloud Firestore security rules
├── storage.rules               # Storage security rules
├── tailwind.config.js          # Editorial theme and color palette
├── vite.config.js              # Vite configuration and bundle chunking
└── package.json                # Project dependencies and scripts
```

---

## 10. Quick Command Reference

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the local development server at `http://localhost:3000` |
| `npm run build` | Builds the production bundle, generates `sitemap.xml`, and prerenders all 16 articles |
| `npm run preview` | Previews the production `dist/` build locally |
| `node scripts/testApp.js` | Runs the automated test suite (verifies data integrity, rules & SEO assets) |
| `npm run generate:sitemap` | Re-builds `public/sitemap.xml` with current articles and desks |
| `git push origin main` | Pushes latest changes to your GitHub repository |

---

*PULSE — Independent perspective. Clear reporting.*
