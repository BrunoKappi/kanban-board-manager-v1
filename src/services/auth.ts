import {
  FIREBASE_LoginWithEmailPassword,
  FIREBASE_LoginWithGoogle,
  FIREBASE_RegisterUserEmailPassword,
  FIREBASE_SendEMailResetPassword,
  FIREBASE_Logout,
  FIREBASE_ChangePassword,
} from "@/Config/Firebase/Auth";
import { deleteUser } from "firebase/auth";
import { Firease_Auth } from "@/Config/Firebase/Config";

export const authLoginWithEmailPassword = (email: string, password: string) =>
  FIREBASE_LoginWithEmailPassword(email, password);

export const authLoginWithGoogle = () =>
  FIREBASE_LoginWithGoogle();

export const authRegisterUserEmailPassword = (email: string, password: string) =>
  FIREBASE_RegisterUserEmailPassword(email, password);

export const authSendEMailResetPassword = (email: string) =>
  FIREBASE_SendEMailResetPassword(email);

export const authLogout = () =>
  FIREBASE_Logout();

export const authChangePassword = (password: string) =>
  FIREBASE_ChangePassword(password);

export const authDeleteCurrentUser = async (): Promise<void> => {
  const user = Firease_Auth.currentUser;
  if (user) {
    await deleteUser(user);
  } else {
    throw new Error("No user is currently signed in.");
  }
};

export const authGetCurrentUser = () => {
  return Firease_Auth.currentUser;
};
