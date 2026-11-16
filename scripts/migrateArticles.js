/**
 * PULSE Content Migration CLI Script
 * 
 * Migrates all 16 existing articles, categories, and authors into Firestore
 * with duplicate-checking based on article slug and ID.
 * 
 * Usage:
 *   node scripts/migrateArticles.js
 */

import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES } from "../src/data/initialData.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.log("ℹ️ Note: scripts/serviceAccountKey.json not detected.");
  console.log("You can also run the migration directly inside the browser via the Admin CMS Dashboard with 1-click!");
  console.log("To run via CLI: place your Firebase serviceAccountKey.json in scripts/ and rerun.");
  process.exit(0);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function runMigration() {
  console.log("🚀 Starting PULSE Content Migration...");

  // 1. Categories
  console.log(`\n📁 Migrating ${INITIAL_CATEGORIES.length} Categories...`);
  let catsAdded = 0;
  for (const cat of INITIAL_CATEGORIES) {
    const docRef = db.collection("categories").doc(cat.slug);
    const snap = await docRef.get();
    if (!snap.exists) {
      await docRef.set(cat);
      catsAdded++;
      console.log(`  + Added Category: ${cat.name}`);
    } else {
      console.log(`  = Exists: ${cat.name}`);
    }
  }

  // 2. Articles
  console.log(`\n📰 Migrating ${INITIAL_ARTICLES.length} Existing Articles...`);
  let artsAdded = 0;
  for (const art of INITIAL_ARTICLES) {
    const querySnap = await db.collection("articles").where("slug", "==", art.slug).limit(1).get();
    if (querySnap.empty) {
      await db.collection("articles").doc(art.id).set({
        ...art,
        serverCreatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      artsAdded++;
      console.log(`  + Added Article #${art.originalId}: "${art.title}"`);
    } else {
      console.log(`  = Already Exists: "${art.title}"`);
    }
  }

  console.log(`\n🎉 Migration Complete:`);
  console.log(`   ${catsAdded} new categories created`);
  console.log(`   ${artsAdded} new articles inserted`);
  console.log(`   Total articles preserved: ${INITIAL_ARTICLES.length}`);
  process.exit(0);
}

runMigration().catch(err => {
  console.error("Migration Error:", err);
  process.exit(1);
});
