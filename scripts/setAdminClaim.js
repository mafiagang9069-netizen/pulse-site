/**
 * PULSE Administrator Custom Claims Provisioning Script
 * 
 * Usage:
 *   1. Download your service account private key from Firebase Console:
 *      Project Settings -> Service Accounts -> "Generate New Private Key"
 *   2. Save the JSON file as `serviceAccountKey.json` inside this `scripts/` folder
 *      (Note: serviceAccountKey.json is in .gitignore and never committed)
 *   3. Run:
 *      node scripts/setAdminClaim.js user@example.com
 */

import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error("❌ Error: Target email required.\nUsage: node scripts/setAdminClaim.js <admin-email>");
  process.exit(1);
}

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`❌ Error: Service account key not found at ${serviceAccountPath}`);
  console.log(`
To configure the first admin:
1. Open Firebase Console -> Project Settings -> Service Accounts
2. Click "Generate New Private Key"
3. Save the downloaded JSON file as:
   scripts/serviceAccountKey.json
4. Run this script again:
   node scripts/setAdminClaim.js ${targetEmail}
`);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function grantAdmin(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      role: "admin"
    });

    // Also update or create user record in Firestore users collection
    const db = admin.firestore();
    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      role: "admin",
      displayName: user.displayName || "Editorial Administrator",
      updatedAt: new Date().toISOString()
    }, { merge: true });

    console.log(`✅ Success: Administrator custom claim [admin: true] assigned to ${email} (UID: ${user.uid})`);
    console.log("The user can now sign in to the PULSE Admin CMS at /admin/login with full Firestore security rule authorization.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to set admin claim:", error.message);
    process.exit(1);
  }
}

grantAdmin(targetEmail);
