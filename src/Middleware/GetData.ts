import { getKeysWithSubstring } from "@/components/ManageAccount/Register.Utils";
import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList, FIREBASE_CreateUser, FIREBASE_GetBoard, FIREBASE_GetBoardList, FIREBASE_GetUser } from "@/Config/Firebase/Firestore";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";
import { DefaultBoardList } from "@/Data/BoardList";
import { Boards } from "@/Data/Boards";
import { ExampleBoard1 } from "@/Data/ExampleBoard1";
import moment from "moment";
import { v4 } from "uuid";

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

const SyncCurrentUserWork = async (Uid: string) => {
  if (!Uid) return;
  //@ts-ignore
  store.dispatch(SetCardModalCard({}));

  const UserUid = Uid;

  if (localStorage.getItem(`Kanban-BoardList`)) {
    const LocalStorageBoardList = getKeysWithSubstring("Kanban-BoardListItem-");

    LocalStorageBoardList.map((LocalBoardListString: string) => {
      var BoardListItem = { ...JSON.parse(localStorage.getItem(LocalBoardListString) || "") };
      var NewId = v4();

      var NewBoardListItem = { ...BoardListItem, LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

      FIREBASE_CreateBoardList(NewBoardListItem);

      if (localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`)) {
        var NewBoard = { ...JSON.parse(localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`) || ""), LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };
        FIREBASE_CreateBoard(NewBoard);
      }
    });
  } else {
    var NewId = v4();
    var NewBoardListItem = { ...DefaultBoardList[0], LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };
    var NewBoard = { ...ExampleBoard1, LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };
    FIREBASE_CreateBoard(NewBoard);
    FIREBASE_CreateBoardList(NewBoardListItem);
  }
  GetBoardList();
};

export const MIDDLEWARE_GetUser = async (Uid: string, Email: string) => {
  if (!Uid || !Email) return;

  const Data = await FIREBASE_GetUser(Uid);

  if (Data.length !== 0) return;

  const NewUser = {
    Uid: Uid,
    Email: Email,
    CreatedAt: moment().valueOf(),
  };

  const Response = await FIREBASE_CreateUser(NewUser);

  SyncCurrentUserWork(Uid);
};
