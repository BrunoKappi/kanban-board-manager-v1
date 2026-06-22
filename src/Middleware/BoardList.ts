import { dbCreateBoardList, dbDeleteBoardListItem, dbGetBoardList, dbGetBoardListItem, dbUpdateBoardListItem } from "@/services/db";
import { BoardListItemType } from "@/Data/Types";
import { STORE_SetLoadingSidebar, STORE_SetSelectedBoard, STORE_SetBoardList, STORE_GET } from "./Store";
import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { DefaultBoardList } from "@/Data/BoardList";
import { LOCALSTORAGE_GetItem } from "./LocalStorage";

export const MIDDLEWARE_CreateBoardListItem = (NewBoardListItem: BoardListItemType) => {
  return dbCreateBoardList(NewBoardListItem);
};

export const MIDDLEWARE_UpdateBoardListItem = (NewBoardListItem: BoardListItemType) => {
  return dbUpdateBoardListItem(NewBoardListItem);
};

export const MIDDLEWARE_DeleteBoardListItem = (BoardListItem: any) => {
  return dbDeleteBoardListItem(BoardListItem);
};

export const MIDDLEWARE_GetBoardListItem = (uid: string, BoardId: string) => {
  return dbGetBoardListItem(uid, BoardId);
};

export const MIDDLEWARE_GetBoardList = async () => {
  const { User } = STORE_GET();

  STORE_SetLoadingSidebar(true);

  if (User.uid) {
    //USUSARIO LOGADO
    //@ts-ignore
    const BoardList: BoardListItemType[] = await dbGetBoardList(User.uid);
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
