import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  serverTimestamp
} from "firebase/firestore";
import { db } from "./config";
import { INITIAL_ARTICLES, INITIAL_CATEGORIES } from "../data/initialData";

const ARTICLES_COLLECTION = "articles";
const CATEGORIES_COLLECTION = "categories";
const SUBSCRIBERS_COLLECTION = "newsletterSubscribers";
const LOGS_COLLECTION = "activityLogs";

/**
 * Fetch published articles for public website
 */
export async function getPublishedArticles({ category = null, maxItems = 50 } = {}) {
  if (!db) {
    // Graceful fallback to initial articles
    let filtered = INITIAL_ARTICLES.filter(a => a.status === "published");
    if (category) {
      filtered = filtered.filter(a => 
        a.category.toLowerCase() === category.toLowerCase() ||
        a.categorySlug?.toLowerCase() === category.toLowerCase()
      );
    }
    return filtered;
  }

  try {
    let q;
    if (category) {
      q = query(
        collection(db, ARTICLES_COLLECTION),
        where("status", "==", "published"),
        where("categorySlug", "==", category.toLowerCase()),
        orderBy("publishedAt", "desc"),
        firestoreLimit(maxItems)
      );
    } else {
      q = query(
        collection(db, ARTICLES_COLLECTION),
        where("status", "==", "published"),
        orderBy("publishedAt", "desc"),
        firestoreLimit(maxItems)
      );
    }

    const snapshot = await getDocs(q);
    if (snapshot.empty && !category) {
      // If collection is not yet populated in Firestore, return initial dataset
      return INITIAL_ARTICLES;
    }

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firestore query error (falling back to initial dataset):", error.message);
    let fallback = INITIAL_ARTICLES.filter(a => a.status === "published");
    if (category) {
      fallback = fallback.filter(a => 
        a.category.toLowerCase() === category.toLowerCase() ||
        a.categorySlug?.toLowerCase() === category.toLowerCase()
      );
    }
    return fallback;
  }
}

/**
 * Fetch a single article by its SEO slug
 */
export async function getArticleBySlug(slug) {
  if (!slug) return null;

  if (!db) {
    return INITIAL_ARTICLES.find(a => a.slug === slug) || null;
  }

  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where("slug", "==", slug),
      firestoreLimit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
    // Fallback search in initial articles
    return INITIAL_ARTICLES.find(a => a.slug === slug) || null;
  } catch (error) {
    console.warn("Error getting article by slug:", error.message);
    return INITIAL_ARTICLES.find(a => a.slug === slug) || null;
  }
}

/**
 * Fetch all articles for Admin CMS (including drafts and scheduled)
 */
export async function getAllArticlesAdmin() {
  if (!db) {
    return INITIAL_ARTICLES;
  }

  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      orderBy("publishedAt", "desc")
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return INITIAL_ARTICLES;
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Error getting admin articles:", error.message);
    return INITIAL_ARTICLES;
  }
}

/**
 * Create a new article
 */
export async function createArticle(articleData, userEmail = "Admin") {
  if (!db) {
    throw new Error("Cannot save article: Cloud Firestore is not connected. Configure your Firebase project credentials in .env first.");
  }

  const now = new Date().toISOString();
  const docRef = doc(collection(db, ARTICLES_COLLECTION));
  const newArticle = {
    ...articleData,
    id: docRef.id,
    createdAt: now,
    updatedAt: now,
    publishedAt: articleData.status === "published" ? (articleData.publishedAt || now) : null,
    serverCreatedAt: serverTimestamp()
  };

  await setDoc(docRef, newArticle);
  await logActivity("Created Article", `Created "${articleData.title}" (${articleData.status})`, userEmail);
  return newArticle;
}

/**
 * Update an existing article
 */
export async function updateArticle(articleId, updates, userEmail = "Admin") {
  if (!db) {
    throw new Error("Cannot update article: Cloud Firestore is not connected.");
  }

  const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
  const data = {
    ...updates,
    updatedAt: new Date().toISOString(),
    serverUpdatedAt: serverTimestamp()
  };

  await updateDoc(articleRef, data);
  await logActivity("Updated Article", `Updated "${updates.title || articleId}"`, userEmail);
  return { id: articleId, ...data };
}

/**
 * Delete an article
 */
export async function deleteArticle(articleId, articleTitle = "", userEmail = "Admin") {
  if (!db) {
    throw new Error("Cannot delete article: Cloud Firestore is not connected.");
  }

  const articleRef = doc(db, ARTICLES_COLLECTION, articleId);
  await deleteDoc(articleRef);
  await logActivity("Deleted Article", `Deleted "${articleTitle || articleId}"`, userEmail);
  return true;
}

/**
 * Quick toggle publish / draft status
 */
export async function toggleArticleStatus(articleId, currentStatus, title = "", userEmail = "Admin") {
  const newStatus = currentStatus === "published" ? "draft" : "published";
  const now = new Date().toISOString();
  const updates = {
    status: newStatus,
    updatedAt: now,
    ...(newStatus === "published" ? { publishedAt: now } : {})
  };
  return await updateArticle(articleId, updates, userEmail);
}

/**
 * Categories Management
 */
export async function getCategories() {
  if (!db) {
    return INITIAL_CATEGORIES;
  }

  try {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (snapshot.empty) {
      return INITIAL_CATEGORIES;
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return INITIAL_CATEGORIES;
  }
}

export async function saveCategory(categoryData, userEmail = "Admin") {
  if (!db) {
    throw new Error("Cloud Firestore is not connected.");
  }
  const id = categoryData.slug || categoryData.id;
  const catRef = doc(db, CATEGORIES_COLLECTION, id);
  await setDoc(catRef, { ...categoryData, id }, { merge: true });
  await logActivity("Saved Category", `Saved category "${categoryData.name}"`, userEmail);
  return { id, ...categoryData };
}

/**
 * Newsletter Subscription
 */
export async function addNewsletterSubscriber(email) {
  if (!email || !email.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }

  if (!db) {
    // Offline simulation
    return { success: true, email, message: "Thank you for subscribing to PULSE!" };
  }

  const q = query(
    collection(db, SUBSCRIBERS_COLLECTION),
    where("email", "==", email.toLowerCase().trim()),
    firestoreLimit(1)
  );
  const existing = await getDocs(q);
  if (!existing.empty) {
    return { success: true, alreadySubscribed: true, message: "You are already subscribed to PULSE." };
  }

  await addDoc(collection(db, SUBSCRIBERS_COLLECTION), {
    email: email.toLowerCase().trim(),
    subscribedAt: new Date().toISOString(),
    status: "active"
  });

  return { success: true, message: "Thank you for subscribing to PULSE!" };
}

export async function getNewsletterSubscribers() {
  if (!db) return [];
  try {
    const snapshot = await getDocs(collection(db, SUBSCRIBERS_COLLECTION));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return [];
  }
}

/**
 * Activity Logs
 */
export async function logActivity(action, details, userEmail = "System") {
  if (!db) return;
  try {
    await addDoc(collection(db, LOGS_COLLECTION), {
      action,
      details,
      userEmail,
      timestamp: new Date().toISOString()
    });
  } catch (e) {
    // Silently ignore log failures
  }
}

export async function getActivityLogs(maxLogs = 20) {
  if (!db) {
    return [
      { id: "log-1", action: "System Ready", details: "PULSE Editorial CMS initialized", userEmail: "System", timestamp: new Date().toISOString() }
    ];
  }
  try {
    const q = query(
      collection(db, LOGS_COLLECTION),
      orderBy("timestamp", "desc"),
      firestoreLimit(maxLogs)
    );
    const snap = await getDocs(q);
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return [];
  }
}

/**
 * Seed all 16 initial articles and categories into Firestore safely (prevents duplicates)
 */
export async function seedInitialDataToFirestore(userEmail = "Admin") {
  if (!db) {
    throw new Error("Cannot seed: Cloud Firestore is not connected. Configure your Firebase credentials in .env first.");
  }

  let articlesImported = 0;
  let categoriesImported = 0;

  // 1. Seed Categories
  for (const cat of INITIAL_CATEGORIES) {
    const catRef = doc(db, CATEGORIES_COLLECTION, cat.slug);
    const catSnap = await getDoc(catRef);
    if (!catSnap.exists()) {
      await setDoc(catRef, cat);
      categoriesImported++;
    }
  }

  // 2. Seed Articles
  for (const art of INITIAL_ARTICLES) {
    // Check if article with this slug already exists to prevent duplicate imports
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where("slug", "==", art.slug),
      firestoreLimit(1)
    );
    const existing = await getDocs(q);
    if (existing.empty) {
      const artRef = doc(db, ARTICLES_COLLECTION, art.id);
      await setDoc(artRef, art);
      articlesImported++;
    }
  }

  await logActivity("Content Migration", `Seeded ${articlesImported} articles and ${categoriesImported} categories into Firestore`, userEmail);

  return {
    articlesImported,
    categoriesImported,
    totalArticles: INITIAL_ARTICLES.length
  };
}
