import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

/**
 * Upload an image file to Firebase Storage
 * @param {File} file - Browser File object
 * @param {string} folder - Destination folder (e.g. 'articles', 'authors')
 * @param {Function} onProgress - Optional callback for upload progress (0-100)
 * @returns {Promise<string>} Download URL
 */
export async function uploadImage(file, folder = "articles", onProgress = null) {
  if (!storage) {
    throw new Error("Firebase Storage is not connected. Configure your Firebase project in .env to enable direct image uploads.");
  }

  // Sanitize filename and create unique timestamped path
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = `${folder}/${Date.now()}_${sanitizedName}`;
  const storageRef = ref(storage, filePath);

  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: file.type
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress(Math.round(progress));
        }
      },
      (error) => {
        console.error("Storage upload error:", error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}
