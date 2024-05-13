import { FIREBASE_CreateBoardList, FIREBASE_DeleteBoardListItem, FIREBASE_GetBoardList, FIREBASE_GetBoardListItem, FIREBASE_UpdateBoardListItem } from "@/Config/Firebase/Firestore";
import { BoardListItemType } from "@/Data/Types";
import { STORE_SetLoadingSidebar, STORE_SetSelectedBoard, STORE_SetBoardList, STORE_GET } from "./Store";
import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { DefaultBoardList } from "@/Data/BoardList";
import { LOCALSTORAGE_GetItem } from "./LocalStorage";

export const MIDDLEWARE_CreateBoardListItem = (NewBoardListItem: BoardListItemType) => {
  return FIREBASE_CreateBoardList(NewBoardListItem);
};

export const MIDDLEWARE_UpdateBoardListItem = (NewBoardListItem: BoardListItemType) => {
  return FIREBASE_UpdateBoardListItem(NewBoardListItem);
};

export const MIDDLEWARE_DeleteBoardListItem = (BoardListItem: any) => {
  return FIREBASE_DeleteBoardListItem(BoardListItem);
};

export const MIDDLEWARE_GetBoardListItem = (uid: string, BoardId: string) => {
  return FIREBASE_GetBoardListItem(uid, BoardId);
};

export const MIDDLEWARE_GetBoardList = async () => {
  const { User } = STORE_GET();

  STORE_SetLoadingSidebar(true);

  if (User.uid) {
    //USUSARIO LOGADO
    //@ts-ignore
    const BoardList: BoardListItemType[] = await FIREBASE_GetBoardList(User.uid);
    STORE_SetBoardList(BoardList);
    if (BoardList.length > 0) {
      STORE_SetSelectedBoard([...BoardList]?.sort(OrderBoards)[0]?.BoardId);
    } else {
      STORE_SetSelectedBoard("NA");
    }

    return BoardList;
  } else {
    //USUSARIO DESLOGADO
    if (LOCALSTORAGE_GetItem(`Kanban-BoardList`)) {
      const List = JSON.parse(LOCALSTORAGE_GetItem(`Kanban-BoardList`) || "");
      STORE_SetBoardList(List);
      STORE_SetSelectedBoard([...List].sort(OrderBoards)[0]?.BoardId || "NA");
      return List;
    } else {
      STORE_SetBoardList(DefaultBoardList);
      STORE_SetSelectedBoard([...DefaultBoardList].sort(OrderBoards)[0]?.BoardId || "NA");
      return DefaultBoardList;
    }
  }
};
