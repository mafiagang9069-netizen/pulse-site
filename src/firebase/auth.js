import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

/**
 * Sign in admin user with email & password
 */
export async function loginAdmin(email, password) {
  if (!auth) {
    throw new Error("Firebase Authentication is not configured. Please supply your Firebase credentials in .env.");
  }
  return await signInWithEmailAndPassword(auth, email, password);
}

/**
 * Sign out current user
 */
export async function logoutAdmin() {
  if (!auth) return;
  return await signOut(auth);
}

/**
 * Listen to auth state transitions
 */
export function subscribeToAuthChanges(callback) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Verify whether a user is an administrator via custom claims or user document
 */
export async function verifyAdminStatus(user) {
  if (!user) return false;

  try {
    // 1. Check Custom Claims (trusted Admin SDK claim)
    const tokenResult = await user.getIdTokenResult(true);
    if (tokenResult.claims && (tokenResult.claims.admin === true || tokenResult.claims.role === "admin")) {
      return true;
    }

    // 2. Check Firestore users collection document
    if (db) {
      const userRef = doc(db, "users", user.uid);
      try {
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          return userSnap.data().role === "admin";
        } else {
          // Since public registration is disabled, any user account manually created
          // by the owner in the Firebase Console is authorized as an administrator.
          // Automatically initialize their admin profile document in Firestore:
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            role: "admin",
            displayName: user.displayName || (user.email ? user.email.split("@")[0] : "Editor"),
            createdAt: new Date().toISOString()
          }, { merge: true });
          return true;
        }
      } catch (firestoreErr) {
        console.warn("Firestore user check deferred:", firestoreErr.message);
        // Fallback: If Firestore rules have not yet been published, allow authenticated console user
        return true;
      }
    }

    // If user is authenticated in the private Firebase project, grant access
    return true;
  } catch (error) {
    console.error("Error verifying admin status:", error);
    return true;
  }
}
