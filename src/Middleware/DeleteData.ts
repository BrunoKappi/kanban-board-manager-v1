import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { FIREBASE_DeleteBoard, FIREBASE_DeleteBoardListItem } from "@/Config/Firebase/Firestore";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";
import { BoardListItemType } from "@/Data/Types";

export const MIDDLEWARE_DeleteBoard = (Board: any) => {
  const UserUid = store.getState().User?.uid || "";
  const BoardList = [...store.getState().BoardList];
  var NewBoardList = [...store.getState().BoardList];

  //@ts-ignore
  const BoardListItem: BoardListItemType = { ...BoardList.find((Item: BoardListItemType) => Item.BoardId === Board.BoardId) };

  NewBoardList = [...NewBoardList].filter((Item: BoardListItemType) => Item.BoardId !== Board.BoardId);

  if (UserUid) {
    FIREBASE_DeleteBoard(Board);
    FIREBASE_DeleteBoardListItem(BoardListItem);
  }


  store.dispatch(SetBoardList(NewBoardList));
  //@ts-ignore
  store.dispatch(SetSelectedBoard(NewBoardList.sort(OrderBoards)[0]?.BoardId || "NA"));
  localStorage.setItem(`Kanban-BoardList`, JSON.stringify(NewBoardList));
  localStorage.removeItem(`Kanban-Board-${Board.BoardId}`);
  localStorage.removeItem(`Kanban-BoardListItem-${Board.BoardId}`);
};

