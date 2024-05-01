// No arquivo atoms.js
import { atom } from "recoil";
import { User } from "./AuthAtom.Types";

const InitialState: User = {
  displayName: "",
  docID: "",
  email: "",
  uid: "",
  photoURL: "",
};

export const authState = atom({
  key: "authState",
  default: InitialState,
});
