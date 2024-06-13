import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Firease_Auth } from "./Config";
import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import { UserType } from "../Store/User/User";
import { STORE_SetLanguage, STORE_SetTranslations, STORE_SetUser } from "@/Middleware/Store";
import { MIDDLEWARE_GetUserPreferences } from "@/Middleware/UserPreferences";
import { LOCALSTORAGE_GetItem } from "@/Middleware/LocalStorage";
import { MIDDLEWARE_GetUser } from "@/Middleware/User";
import { getQueryParams } from "@/lib/utils";

const onAuthStateChangedHandler = (AuthCurrentUser: User) => {
  //console.log("FIREBASE AuthChanged", AuthCurrentUser ? AuthCurrentUser : "FIREBASE Auth Vazio");

  const User: UserType = {
    displayName: AuthCurrentUser?.displayName || getQueryParams("displayName"),
    docID: "",
    Email: AuthCurrentUser?.email || getQueryParams("email"),
    uid: AuthCurrentUser?.uid || getQueryParams("uid"),
    photoURL: AuthCurrentUser?.photoURL || "",
    loading: false,
    CreatedAt: 0,
    LastEditedAt: 0,
  };

  STORE_SetUser(User);

  if (User?.uid) {
    MIDDLEWARE_GetUserPreferences(User.uid);
    MIDDLEWARE_GetUser(User.uid).then((UsersFound) => {
      //@ts-ignore
      const CurrentUserData = UsersFound[0];

      if (CurrentUserData) {
        STORE_SetUser(CurrentUserData);
      }
    });
  } else {
    const Language = LOCALSTORAGE_GetItem("Kanban-Language") || "English";
    STORE_SetLanguage(Language);
    STORE_SetTranslations(Language);
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
