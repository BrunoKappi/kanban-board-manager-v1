import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

var firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APIKEY,
  authDomain: import.meta.env.VITE_REACT_AUTHDOMAIN,
  projectId: import.meta.env.VITE_REACT_PROJECTID,
  storageBucket: import.meta.env.VITE_REACT_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_REACT_APPID,
  measurementId: import.meta.env.VITE_REACT_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const Firebase_DB = getFirestore(app);
export const Firease_Auth = getAuth(app);
export const Firebase_Storage = getStorage(app);
