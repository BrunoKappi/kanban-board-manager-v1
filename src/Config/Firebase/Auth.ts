import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Firease_Auth } from "./Config";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import store from "../Store/Store";
import { SetUser, UserType } from "../Store/User/User";
import { MIDDLEWARE_GetUserPreferences } from "@/Middleware/GetData";
import { SetLanguage } from "../Store/Language/Language";

import { MIDDLEWARE_SetTranslations } from "@/Middleware/SetData";

const onAuthStateChangedHandler = (AuthCurrentUser: User) => {
  //console.log("FIREBASE AuthChanged", AuthCurrentUser ? AuthCurrentUser : "FIREBASE Auth Vazio");

  const User: UserType = {
    displayName: AuthCurrentUser?.displayName || "Guest",
    docID: "",
    email: AuthCurrentUser?.email || "",
    uid: AuthCurrentUser?.uid || "",
    photoURL: AuthCurrentUser?.photoURL || "",
    loading: false,
  };

  //@ts-ignore
  store.dispatch(SetUser(User));

  if (User?.uid) {
    MIDDLEWARE_GetUserPreferences(User?.uid);
  } else {
    const Language = localStorage.getItem("Kanban-Language") || "English";
    store.dispatch(SetLanguage(Language));

    MIDDLEWARE_SetTranslations(Language);
  }
};

//@ts-ignore
export const UnsubscribeFirebaseAuth = onAuthStateChanged(Firease_Auth, onAuthStateChangedHandler);

export const FIREBASE_ChangePassword = async (password: string) => {
  //@ts-ignore
  return updatePassword(Firease_Auth.currentUser, password);
};

export const FIREBASE_SendEMailResetPassword = async (email: string) => {
  return sendPasswordResetEmail(Firease_Auth, email);
};

export const FIREBASE_RegisterUserEmailPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(Firease_Auth, email, password);
};

export const FIREBASE_LoginWithEmailPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(Firease_Auth, email, password);
};

export const FIREBASE_Logout = async () => {
  await signOut(Firease_Auth);
};

const GoogleProvider = new GoogleAuthProvider();

export const FIREBASE_LoginWithGoogle = () => {
  return signInWithPopup(Firease_Auth, GoogleProvider);
};
