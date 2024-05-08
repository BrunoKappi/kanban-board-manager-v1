import { collection, deleteDoc, DocumentReference, onSnapshot, Unsubscribe } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, doc, where, query } from "firebase/firestore";
import { Firebase_DB } from "./Config";
import { MIDDLEWARE_SyncBoard } from "@/Middleware/SetData";

export const FIREBASE_CreateBoard = async (Payload: any) => {
  var CollectionRef = collection(Firebase_DB, "Boards");
  return addDoc(CollectionRef, Payload);
};

export const FIREBASE_CreateUser = async (Payload: any) => {
  var CollectionRef = collection(Firebase_DB, "Users");
  return addDoc(CollectionRef, Payload);
};

export const FIREBASE_CreateUserPreferences = async (Payload: any) => {
  var CollectionRef = collection(Firebase_DB, "UsersPreferences");
  return addDoc(CollectionRef, Payload);
};

export const FIREBASE_DeleteBoard = async (Payload: any) => {
  if (!Payload.docID) return;
  var CollectionRef = collection(Firebase_DB, "Boards");
  const DocRef = doc(CollectionRef, Payload.docID);
  return deleteDoc(DocRef);
};

export const FIREBASE_CreateBoardList = async (Payload: any) => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  return addDoc(CollectionRef, Payload);
};

export const FIREBASE_DeleteBoardListItem = async (Payload: any) => {
  if (!Payload.docID) return;
  var CollectionRef = collection(Firebase_DB, "BoardList");
  const DocRef = doc(CollectionRef, Payload.docID);
  return deleteDoc(DocRef);
};

//UPDATE
export const FIREBASE_UpdateBoard = async (Board: any) => {
  if (Board?.docID) {
    return updateDoc(doc(Firebase_DB, "Boards", Board?.docID), Board);
  }
};

//UPDATE
export const FIREBASE_UpdateUserPreferences = async (UserPreference: any) => {
  if (UserPreference?.docID) {
    return updateDoc(doc(Firebase_DB, "UsersPreferences", UserPreference?.docID), UserPreference);
  }
};

//UPDATE
export const FIREBASE_UpdateBoardListItem = async (BoardListItem: any) => {
  if (BoardListItem?.docID) {
    return updateDoc(doc(Firebase_DB, "BoardList", BoardListItem?.docID), BoardListItem);
  }
};

//get
export const FIREBASE_GetDocBoards = async (uid: string) => {
  var CollectionRef = collection(Firebase_DB, "Boards");
  const Query = query(CollectionRef, where("OwnerUid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs;
};

//GET USER
export const FIREBASE_GetUser = async (uid: string) => {
  var CollectionRef = collection(Firebase_DB, "Users");
  const Query = query(CollectionRef, where("Uid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs;
};

// GET ALL USERS
export const FIREBASE_GetAllUsers = async () => {
  const collectionRef = collection(Firebase_DB, "Users");
  const querySnapshot = await getDocs(collectionRef);
  const allUsers = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return allUsers;
};

//GET USER BY EMAIL
export const FIREBASE_GetUserByEmail = async (Email: string) => {
  var CollectionRef = collection(Firebase_DB, "Users");
  const Query = query(CollectionRef, where("Email", "==", Email));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs[0];
};

//get
export const FIREBASE_GetBoardList = async (uid: string) => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  const Query = query(CollectionRef, where("OwnerUid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs;
};

let unsubscribe: Unsubscribe | null = null;

export const setListeningBoard = (docID: string) => {
  console.log("STARTED LISTENING");
  const docRef: DocumentReference = doc(Firebase_DB, "Boards", docID);
  unsubscribe = onSnapshot(docRef, (doc) => {
    //@ts-ignore
    MIDDLEWARE_SyncBoard(doc.data());
  });
};

export const stopListeningBoard = () => {
  if (unsubscribe) {
    console.log("STOPPED LISTENING");
    unsubscribe();
    unsubscribe = null;
  }
};

//get
export const FIREBASE_GetBoardListByBoardId = async (BoardId: string) => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  const Query = query(CollectionRef, where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs;
};

//get
export const FIREBASE_GetBoardListItem = async (uid: string, BoardId: string) => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  const Query = query(CollectionRef, where("OwnerUid", "==", uid), where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs[0];
};

//@ts-ignore
export const FIREBASE_GetBoard = async (uid: string, BoardId: string) => {
  var CollectionRef = collection(Firebase_DB, "Boards");
  //const Query = query(CollectionRef, where("BoardId", "==", BoardId), where("OwnerUid", "==", uid));
  const Query = query(CollectionRef, where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs[0];
};

//get
export const FIREBASE_GetPublicBoard = async (BoardId: string) => {
  var CollectionRef = collection(Firebase_DB, "Boards");
  const Query = query(CollectionRef, where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs[0];
};

//USER PREFERENCES
export const FIREBASE_GetUserPreferences = async (uid: string) => {
  var CollectionRef = collection(Firebase_DB, "UsersPreferences");
  const Query = query(CollectionRef, where("Uid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  return matchedDocs[0];
};
