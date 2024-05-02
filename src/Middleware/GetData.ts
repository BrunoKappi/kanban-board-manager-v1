import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { FIREBASE_GetBoard, FIREBASE_GetBoardList } from "@/Config/Firebase/Firestore";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";
import { DefaultBoardList } from "@/Data/BoardList";
import { Boards } from "@/Data/Boards";

export const GetBoardList = async () => {
  //@ts-ignore
  const { User, SelectedBoard, Board } = store.getState();

  //USUSARIO LOGADO
  if (User.uid) {
    const BoardList = await FIREBASE_GetBoardList(User.uid);

    //@ts-ignore
    store.dispatch(SetBoardList(BoardList));

    if (BoardList.length > 0) {
      //@ts-ignore
      store.dispatch(SetSelectedBoard([...BoardList]?.sort(OrderBoards)[0]?.BoardId));
    } else {
      //@ts-ignore
      store.dispatch(SetSelectedBoard("NA"));
    }

    return BoardList;
  }
  //USUSARIO DESLOGADO
  else {
    if (localStorage.getItem(`Kanban-BoardList`)) {
      const List = JSON.parse(localStorage.getItem(`Kanban-BoardList`) || "");

      store.dispatch(SetBoardList(List));
      store.dispatch(SetSelectedBoard([...List].sort(OrderBoards)[0]?.BoardId || "NA"));
      return List;
    } else {
      store.dispatch(SetBoardList(DefaultBoardList));
      //@ts-ignore
      store.dispatch(SetSelectedBoard([...DefaultBoardList].sort(OrderBoards)[0]?.BoardId || "NA"));
      return DefaultBoardList;
    }
  }
};

export const GetBoard = async (BoardId: string) => {
  //@ts-ignore
  const { User, SelectedBoard, BoardList, Board } = store.getState();

  //USUSARIO LOGADO
  if (User.uid) {
    const Board = await FIREBASE_GetBoard(User.uid, BoardId);
    //@ts-ignore
    store.dispatch(SetBoard(Board));
    return Board;
  }
  //USUSARIO DESLOGADO
  else {
    if (localStorage.getItem(`Kanban-Board-${BoardId}`)) {
      return JSON.parse(localStorage.getItem(`Kanban-Board-${BoardId}`) || "");
    } else {
      const Board = Boards.find((Board) => Board.BoardId === BoardId);
      //@ts-ignore
      //store.dispatch(SetBoard(Board));
      return Board;
    }
  }
};
