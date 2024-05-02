import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Firease_Auth } from "./Config";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import store from "../Store/Store";
import { SetUser, UserType } from "../Store/User/User";

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
