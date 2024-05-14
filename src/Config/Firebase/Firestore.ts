import { UserType } from "@/Config/Store/User/User";
import { collection, deleteDoc, DocumentReference, onSnapshot, Unsubscribe } from "firebase/firestore";
import { getDocs, addDoc, updateDoc, doc, where, query } from "firebase/firestore";
import { Firebase_DB } from "./Config";
import { STORE_SyncBoard } from "@/Middleware/Store";
import { BoardListItemType, BoardType, UserPrefenceType } from "@/Data/Types";

//CREATE

export const FIREBASE_CreateBoard = async (Payload: BoardType) => {
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

//DELETE

export const FIREBASE_CreateBoardList = async (Payload: any) => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  return addDoc(CollectionRef, Payload);
};

export const FIREBASE_DeleteBoard = async (Payload: any) => {
  if (!Payload.docID) return;
  var CollectionRef = collection(Firebase_DB, "Boards");
  const DocRef = doc(CollectionRef, Payload.docID);
  return deleteDoc(DocRef);
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

export const FIREBASE_UpdateUser = async (User: any) => {
  if (User?.docID) {
    return updateDoc(doc(Firebase_DB, "Users", User?.docID), User);
  }
};

export const FIREBASE_UpdateUserPreferences = async (UserPreference: any) => {
  if (UserPreference?.docID) {
    return updateDoc(doc(Firebase_DB, "UsersPreferences", UserPreference?.docID), UserPreference);
  }
};

export const FIREBASE_UpdateBoardListItem = async (BoardListItem: any) => {
  if (BoardListItem?.docID) {
    return updateDoc(doc(Firebase_DB, "BoardList", BoardListItem?.docID), BoardListItem);
  }
};

//get
export const FIREBASE_GetDocBoards = async (uid: string): Promise<BoardType | []> => {
  var CollectionRef = collection(Firebase_DB, "Boards");
  const Query = query(CollectionRef, where("OwnerUid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  //@ts-ignore
  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs;
  } else {
    return [];
  }
};

//GET USER
export const FIREBASE_GetUser = async (uid: string): Promise<UserType[] | null> => {
  var CollectionRef = collection(Firebase_DB, "Users");
  const Query = query(CollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  //@ts-ignore
  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs;
  } else {
    return [];
  }
};

// GET ALL USERS
export const FIREBASE_GetAllUsers = async (): Promise<UserType[] | []> => {
  const collectionRef = collection(Firebase_DB, "Users");
  const querySnapshot = await getDocs(collectionRef);
  const allUsers = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  if (allUsers.length > 0) {
    //@ts-ignore
    return allUsers;
  } else {
    return [];
  }
};

//GET USER BY EMAIL
export const FIREBASE_GetUserByEmail = async (Email: string): Promise<UserType | null> => {
  var CollectionRef = collection(Firebase_DB, "Users");
  const Query = query(CollectionRef, where("Email", "==", Email));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));

  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs[0];
  } else {
    return null;
  }
};

//get
export const FIREBASE_GetBoardList = async (uid: string): Promise<BoardListItemType[] | []> => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  const Query = query(CollectionRef, where("OwnerUid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  //@ts-ignore
  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs;
  } else {
    return [];
  }
};

let unsubscribe: Unsubscribe | null = null;

export const setListeningBoard = (docID: string) => {
  if (docID) {
    console.log("STARTED LISTENING");
    const docRef: DocumentReference = doc(Firebase_DB, "Boards", docID);
    unsubscribe = onSnapshot(docRef, (doc) => STORE_SyncBoard(doc.data()));
  } else {
    return;
  }
};

export const stopListeningBoard = () => {
  if (unsubscribe) {
    console.log("STOPPED LISTENING");
    unsubscribe();
    unsubscribe = null;
  }
};

//get
export const FIREBASE_GetBoardListByBoardId = async (BoardId: string): Promise<BoardListItemType[] | []> => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  const Query = query(CollectionRef, where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  //@ts-ignore
  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs;
  } else {
    return [];
  }
};

//get
export const FIREBASE_GetBoardListItem = async (uid: string, BoardId: string): Promise<BoardListItemType | null> => {
  var CollectionRef = collection(Firebase_DB, "BoardList");
  const Query = query(CollectionRef, where("OwnerUid", "==", uid), where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));

  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs[0];
  } else {
    return null;
  }
};

//@ts-ignore
export const FIREBASE_GetBoard = async (uid: string, BoardId: string): Promise<BoardType | null> => {
  var CollectionRef = collection(Firebase_DB, "Boards");
  //const Query = query(CollectionRef, where("BoardId", "==", BoardId), where("OwnerUid", "==", uid));
  const Query = query(CollectionRef, where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs[0];
  } else {
    return null;
  }
};

//get
export const FIREBASE_GetPublicBoard = async (BoardId: string): Promise<BoardType | null> => {
  var CollectionRef = collection(Firebase_DB, "Boards");
  const Query = query(CollectionRef, where("BoardId", "==", BoardId));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs[0];
  } else {
    return null;
  }
};

//USER PREFERENCES
export const FIREBASE_GetUserPreferences = async (uid: string): Promise<UserPrefenceType | null> => {
  var CollectionRef = collection(Firebase_DB, "UsersPreferences");
  const Query = query(CollectionRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(Query);
  const matchedDocs = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    docID: doc.id,
  }));
  if (matchedDocs.length > 0) {
    //@ts-ignore
    return matchedDocs[0];
  } else {
    return null;
  }
};
