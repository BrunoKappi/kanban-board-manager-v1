import {
  FIREBASE_CreateBoard,
  FIREBASE_CreateUser,
  FIREBASE_CreateUserPreferences,
  FIREBASE_CreateBoardList,
  FIREBASE_DeleteBoard,
  FIREBASE_DeleteBoardListItem,
  FIREBASE_UpdateBoard,
  FIREBASE_UpdateUser,
  FIREBASE_UpdateUserPreferences,
  FIREBASE_UpdateBoardListItem,
  FIREBASE_GetDocBoards,
  FIREBASE_GetUser,
  FIREBASE_GetAllUsers,
  FIREBASE_GetUserByEmail,
  FIREBASE_GetBoardList,
  FIREBASE_GetBoardListByBoardId,
  FIREBASE_GetBoardListItem,
  FIREBASE_GetBoard,
  FIREBASE_GetPublicBoard,
  FIREBASE_GetUserPreferences,
  setListeningBoard,
  stopListeningBoard,
} from "@/Config/Firebase/Firestore";
import { BoardListItemType, BoardType, UserPrefenceType } from "@/Data/Types";
import { UserType } from "@/Config/Store/User/User";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Firebase_DB } from "@/Config/Firebase/Config";

// Boards
export const dbCreateBoard = (payload: BoardType) => FIREBASE_CreateBoard(payload);
export const dbGetBoard = (uid: string, boardId: string) => FIREBASE_GetBoard(uid, boardId);
export const dbGetDocBoards = (uid: string) => FIREBASE_GetDocBoards(uid);
export const dbGetPublicBoard = (boardId: string) => FIREBASE_GetPublicBoard(boardId);
export const dbUpdateBoard = (board: any) => FIREBASE_UpdateBoard(board);
export const dbDeleteBoard = (payload: any) => FIREBASE_DeleteBoard(payload);
export const dbSetListeningBoard = (docID: string) => setListeningBoard(docID);
export const dbStopListeningBoard = () => stopListeningBoard();

// BoardList Items
export const dbCreateBoardList = (payload: any) => FIREBASE_CreateBoardList(payload);
export const dbGetBoardList = (uid: string) => FIREBASE_GetBoardList(uid);
export const dbGetBoardListByBoardId = (boardId: string) => FIREBASE_GetBoardListByBoardId(boardId);
export const dbGetBoardListItem = (uid: string, boardId: string) => FIREBASE_GetBoardListItem(uid, boardId);
export const dbUpdateBoardListItem = (boardListItem: any) => FIREBASE_UpdateBoardListItem(boardListItem);
export const dbDeleteBoardListItem = (payload: any) => FIREBASE_DeleteBoardListItem(payload);

// Users
export const dbCreateUser = (payload: any) => FIREBASE_CreateUser(payload);
export const dbGetUser = (uid: string) => FIREBASE_GetUser(uid);
export const dbGetAllUsers = () => FIREBASE_GetAllUsers();
export const dbGetUserByEmail = (email: string) => FIREBASE_GetUserByEmail(email);
export const dbUpdateUser = (user: any) => FIREBASE_UpdateUser(user);

// User Preferences
export const dbCreateUserPreferences = (payload: any) => FIREBASE_CreateUserPreferences(payload);
export const dbGetUserPreferences = (uid: string) => FIREBASE_GetUserPreferences(uid);
export const dbUpdateUserPreferences = (userPreference: any) => FIREBASE_UpdateUserPreferences(userPreference);

// LGPD: Delete all user documents from all collections
export const dbDeleteAllUserData = async (uid: string): Promise<void> => {
  // 1. Delete Boards
  const boardsQuery = query(collection(Firebase_DB, "Boards"), where("OwnerUid", "==", uid));
  const boardsSnap = await getDocs(boardsQuery);
  for (const docItem of boardsSnap.docs) {
    await deleteDoc(doc(Firebase_DB, "Boards", docItem.id));
  }

  // 2. Delete BoardList Items
  const boardListQuery = query(collection(Firebase_DB, "BoardList"), where("OwnerUid", "==", uid));
  const boardListSnap = await getDocs(boardListQuery);
  for (const docItem of boardListSnap.docs) {
    await deleteDoc(doc(Firebase_DB, "BoardList", docItem.id));
  }

  // 3. Delete User Preferences
  const prefQuery = query(collection(Firebase_DB, "UsersPreferences"), where("uid", "==", uid));
  const prefSnap = await getDocs(prefQuery);
  for (const docItem of prefSnap.docs) {
    await deleteDoc(doc(Firebase_DB, "UsersPreferences", docItem.id));
  }

  // 4. Delete User Profile document
  const userQuery = query(collection(Firebase_DB, "Users"), where("uid", "==", uid));
  const userSnap = await getDocs(userQuery);
  for (const docItem of userSnap.docs) {
    await deleteDoc(doc(Firebase_DB, "Users", docItem.id));
  }
};
