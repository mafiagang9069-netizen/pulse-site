# PULSE — Premium Digital News & Editorial Platform (v2.0)

> **What the world is reading right now.**  
> *Independent perspective. Clear reporting.*

Welcome to the newly rebuilt **PULSE** editorial platform. This repository contains the complete production-ready source code for PULSE — engineered as a high-performance, modular digital publishing platform featuring an editorial magazine design, Cloud Firestore database architecture, Firebase Authentication with custom claim security, an interactive admin CMS, dynamic prerendering for Google SEO, and all 16 original articles and contributor profiles preserved with 100% fidelity.

---

## 📑 Table of Contents
1. [Architecture & Tech Stack](#1-architecture--tech-stack)
2. [Project Structure Explained](#2-project-structure-explained)
3. [Step-by-Step Setup for Beginners](#3-step-by-step-setup-for-beginners)
   - [Creating your Firebase Project](#step-1-create-your-firebase-project)
   - [Configuring Environment Variables](#step-2-configure-environment-variables)
   - [Deploying Firestore & Storage Security Rules](#step-3-deploy-security-rules)
   - [Creating the First Administrator Securely](#step-4-create-the-first-administrator-securely)
4. [Content Migration (Syncing 16 Articles)](#4-content-migration)
5. [Publishing Your First Article](#5-publishing-your-first-article)
6. [SEO & Prerendering](#6-seo--prerendering)
7. [Deployment Guide (Render / Firebase Hosting)](#7-deployment-guide)

---

## 1. Architecture & Tech Stack

### Frontend:
- **React (v18)** with modern Functional Components & Hooks
- **Vite (v5)** for lightning-fast bundling and Hot Module Replacement
- **React Router (v6)** with SEO-friendly routes & legacy URL backwards compatibility
- **Tailwind CSS** with editorial magazine color palette (`#FAFAF8` warm background, `#171717` ink, `#315CF5` electric blue)
- **Lucide React** for icons
- **Framer Motion** for subtle editorial animations
- **Playfair Display & DM Sans** typography with responsive typography scaling
- **Dark Mode & Light Mode** with persistent theme preferences

### Backend & Database:
- **Cloud Firestore**: Scalable NoSQL database with collections for `articles`, `categories`, `users`, `newsletterSubscribers`, and `activityLogs`
- **Firebase Authentication**: Email/password authentication restricted to verified administrators via Custom Claims
- **Firebase Storage**: Secure image hosting with drag-and-drop file upload support in the editor

---

## 2. Project Structure Explained

```
├── public/
│   ├── favicon/              # Editorial SVG icon
│   ├── robots.txt            # Search engine crawler permissions
│   └── sitemap.xml           # XML Sitemap indexing all articles and desks
│
├── scripts/
│   ├── setAdminClaim.js      # CLI tool to assign admin: true custom claims
│   ├── migrateArticles.js    # CLI migration script for the 16 original articles
│   ├── generateSitemap.js    # Script to regenerate sitemap.xml dynamically
│   ├── prerender.js          # Pre-renders static HTML snapshots with NewsArticle JSON-LD
│   └── testApp.js            # Automated verification test suite
│
├── src/
│   ├── admin/                # Secure Editorial CMS
│   │   ├── components/       # ProtectedRoute and CMS dialogs
│   │   ├── layouts/          # AdminLayout with responsive sidebar & status bar
│   │   └── pages/            # Dashboard, Article Editor, Articles List, Categories, Subscribers
│   │
│   ├── components/           # Reusable UI Components
│   │   ├── article/          # ArticleCard (standard, compact, horizontal)
│   │   └── common/           # Header, Footer, Ticker, ReadingProgress, SEO Head Manager
│   │
│   ├── context/              # React Context Providers
│   │   ├── AuthContext.jsx   # Manages user session, admin privileges & bypass mode
│   │   └── ThemeContext.jsx  # Manages Dark/Light mode toggle & persistence
│   │
│   ├── data/
│   │   └── initialData.js    # 16 original articles, 11 categories & 3 contributor bios
│   │
│   ├── firebase/             # Firebase SDK Services
│   │   ├── config.js         # Firebase initialization with fallback safety
│   │   ├── auth.js           # Admin authentication & custom claim verification
│   │   ├── firestore.js      # Firestore CRUD, search, and migration engine
│   │   └── storage.js        # Firebase Storage image upload handler
│   │
│   ├── layouts/              # PublicLayout with Ticker, Header & Footer
│   ├── pages/                # All 18 public website pages
│   ├── styles/               # Tailwind CSS & editorial typography rules
│   ├── App.jsx               # Central route configuration
│   └── main.jsx              # React DOM entry point
│
├── firestore.rules           # Cloud Firestore security rules
├── firestore.indexes.json    # Composite query indexes
├── storage.rules             # Firebase Storage security rules
├── firebase.json             # Firebase Hosting configuration & security headers
├── .env.example              # Template for environment variables
└── package.json              # Project scripts and dependencies
```

---

## 3. Step-by-Step Setup for Beginners

If you are new to Firebase or React, follow these step-by-step instructions:

### Step 1: Create your Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/) and sign in with your Google account.
2. Click **Add Project**, name it (e.g. `pulse-editorial`), and click **Continue**.
3. In your project dashboard, enable the following services:
   - **Authentication**: Click **Build > Authentication > Get Started**. Under the **Sign-in method** tab, enable **Email/Password**.
   - **Firestore Database**: Click **Build > Firestore Database > Create Database**. Select a location close to your readers (e.g., `nam5 (us-central)`). Choose **Production Mode**.
   - **Storage**: Click **Build > Storage > Get Started**. Select standard defaults.
4. In Project Settings (the gear icon next to "Project Overview"), scroll down to **Your apps**, click the **Web icon (`</>`)**, and register your app (e.g. `PULSE Web`).
5. Copy the `firebaseConfig` object values shown on screen.

---

### Step 2: Configure Environment Variables
1. In the root of this project, create a file named `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your keys from Step 1:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_SITE_URL=https://pulse-site-mkrs.onrender.com
   VITE_SITE_NAME=PULSE
   ```

---

### Step 3: Deploy Security Rules

We provide production-hardened `firestore.rules` and `storage.rules`.

To deploy them with Firebase CLI:
```bash
npm install -g firebase-tools
firebase login
firebase use --add your_project_id
firebase deploy --only firestore:rules,storage
```

*Or paste the contents of `firestore.rules` directly into the Firebase Console: **Firestore Database > Rules** tab.*

---

### Step 4: Create the First Administrator Securely

As required by enterprise security standards, public user registration is disabled, and administrators are authorized through Firebase **Custom Claims** (`admin: true`), not insecure client-side state.

1. Go to Firebase Console -> **Authentication** -> **Users** tab -> click **Add User**.
2. Enter your desired administrator email and a strong password (e.g., `editor@pulse-media.com`).
3. Now download your Service Account Key to grant custom claims:
   - Go to **Project Settings** -> **Service accounts** tab.
   - Click **Generate new private key**.
   - Save the downloaded JSON file as `scripts/serviceAccountKey.json`.
4. Run the security grant script:
   ```bash
   node scripts/setAdminClaim.js editor@pulse-media.com
   ```
   *Output:*
   ```
   ✅ Success: Administrator custom claim [admin: true] assigned to editor@pulse-media.com
   ```

Now you can log in at `http://localhost:3000/admin/login`!

---

## 4. Content Migration

All 16 original articles, 11 categories, and 3 author profiles are preserved.

### Method A: One-Click Web Migration (Recommended)
1. Sign in to the Admin CMS at `/admin/login`.
2. On the **Dashboard**, locate the **Content Migration Engine** banner.
3. Click **"Sync 16 Articles to Firestore"**.
4. The system validates each slug and automatically populates your Firestore database with all original copy and imagery without duplicates!

### Method B: Terminal Migration Script
```bash
npm run migrate:articles
```

---

## 5. Publishing Your First Article

1. Sign in to the Admin CMS (`/admin/login`).
2. Click **Compose Story** (`/admin/articles/new`).
3. Fill in:
   - **Headline (Title)**: E.g., *"Next-Gen Quantum Chips Pass Cryogenic Stress Tests"*
   - **Dek (Subtitle)**: Short editorial summary.
   - **Desk (Category)**: Select Technology, Business, Science, etc.
   - **Byline**: Select Maya Chen, Daniel Osei, or custom correspondent.
   - **Body**: Use the rich formatting toolbar (H2, H3, Bold, Italic, Quotes, Lists, Links, Image Upload).
   - **Featured Image**: Drag and drop an image or paste an image URL.
   - **SEO Details**: Customize title, description, and keywords with the live Google SERP preview.
4. Click **Preview** to simulate the public reading experience.
5. Choose status: **Published** (immediate), **Draft** (saved privately), or **Scheduled**.
6. Click **Publish Live**. The story is immediately live on the homepage, desk page, and search index!

---

## 6. SEO & Prerendering

PULSE is engineered for high search engine visibility:
- **NewsArticle JSON-LD Structured Data**: Injected dynamically and pre-rendered into static HTML.
- **Dynamic XML Sitemap**: Run `npm run generate:sitemap` or `npm run build` to output `public/sitemap.xml`.
- **Pre-rendered HTML Snapshots**: The build process automatically creates static `.html` files in `dist/articles/` so Googlebot receives complete article bodies without requiring client-side JS.
- **Canonical URLs**: Every page contains self-referencing canonical tags pointing to `https://pulse-site-mkrs.onrender.com`.
- **Social Graph**: Full Open Graph (`og:*`) and Twitter Card (`twitter:*`) tags.

---

## 7. Deployment Guide

### Deploying to Render (Existing Canonical Host)
1. In your Render Dashboard, open your static site service (`pulse-site-mkrs`).
2. Connect your Git repository.
3. Configure the Build & Publish settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Add your Environment Variables in the **Environment** tab:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_SITE_URL`: `https://pulse-site-mkrs.onrender.com`
5. Click **Manual Deploy > Deploy latest commit**.

### Deploying to Firebase Hosting (Alternative)
```bash
npm run build
firebase deploy --only hosting
```

---

## 🧪 Testing

Run the automated test suite anytime to verify all 21 system assertions:
```bash
node scripts/testApp.js
```
All tests verify content integrity, security rules, and SEO assets automatically.
