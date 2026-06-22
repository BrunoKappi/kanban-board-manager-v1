import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const rawConfig = import.meta.env.VITE_FIREBASE_CONFIG;
if (!rawConfig) {
  throw new Error("Missing VITE_FIREBASE_CONFIG environment variable.");
}

const firebaseConfig = JSON.parse(rawConfig);

const app = initializeApp(firebaseConfig);

export const Firebase_DB = getFirestore(app);
export const Firease_Auth = getAuth(app);
export const Firebase_Storage = getStorage(app);
