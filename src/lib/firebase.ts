import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// HARDCODED CONFIG: This ensures the build succeeds on Vercel even if env vars are missing.
// These values are taken from the configuration you provided earlier.
const firebaseConfig = {
  apiKey: "AIzaSyAMju3W3eRbVo5cNKT3xNPqRBRmozKoFig",
  authDomain: "khademni-55444.firebaseapp.com",
  projectId: "khademni-55444",
  storageBucket: "khademni-55444.firebasestorage.app",
  messagingSenderId: "947995063214",
  appId: "1:947995063214:web:cee0c2881da0392c6cce3f",
};

// Initialize Firebase
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize services
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

// Analytics (only browser)
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
      } catch (e) {
        console.error("Analytics initialization failed:", e);
      }
    }
  });
}

export { app, auth, db, storage, analytics };
