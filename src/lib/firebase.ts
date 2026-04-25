import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAMju3W3eRbVo5cNKT3xNPqRBRmozKoFig",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "khademni-55444.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "khademni-55444",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "khademni-55444.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "947995063214",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:947995063214:web:cee0c2881da0392c6cce3f",
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
