import { FIREBASE_GetAllUsers, FIREBASE_GetPublicBoard, FIREBASE_GetUserByEmail, FIREBASE_GetUserPreferences, FIREBASE_UpdateUserPreferences } from "./../Config/Firebase/Firestore";
import { getKeysWithSubstring } from "@/components/ManageAccount/Register.Utils";
import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList, FIREBASE_CreateUser, FIREBASE_CreateUserPreferences, FIREBASE_GetBoard, FIREBASE_GetBoardList, FIREBASE_GetUser } from "@/Config/Firebase/Firestore";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import { SetCardWidth } from "@/Config/Store/CardWidth/CardWidth";
import { SetLanguage } from "@/Config/Store/Language/Language";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";
import { SetTheme } from "@/Config/Store/Theme/Theme";
import { DefaultNewUserPreference, SetUserPreferences } from "@/Config/Store/UserPreferences/UserPreferences";
import { DefaultBoardList } from "@/Data/BoardList";
import { Boards } from "@/Data/Boards";
import { ExampleBoard } from "@/Data/ExampleBoard";
import moment from "moment";
import { v4 } from "uuid";
import { MIDDLEWARE_SetLoadingBoard, MIDDLEWARE_SetLoadingSidebar, MIDDLEWARE_SetTranslations } from "./SetData";
import { BoardListItemType } from "@/Data/Types";

export const GetBoardList = async () => {
  //@ts-ignore
  const { User, SelectedBoard, Board } = store.getState();

  MIDDLEWARE_SetLoadingSidebar(true);

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

export const MIDDLEWARE_GetBoard = async (BoardId: string) => {
  //@ts-ignore
  const { User, SelectedBoard, BoardList, Board } = store.getState();

  MIDDLEWARE_SetLoadingBoard(true);

  //USUSARIO LOGADO
  if (User.uid) {
    const Board = await FIREBASE_GetBoard(User.uid, BoardId);

    //localStorage.setItem(`Kanban-Board-${BoardId}`, JSON.stringify(Board || {}));
    return Board;
  }
  //USUSARIO DESLOGADO
  else {
    if (localStorage.getItem(`Kanban-Board-${BoardId}`)) {
      return JSON.parse(localStorage.getItem(`Kanban-Board-${BoardId}`) || "");
    } else {
      const Board = Boards.find((Board) => Board.BoardId === BoardId);
      return Board;
    }
  }
};

export const MIDDLEWARE_GetPublicBoard = async (BoardId: string) => {
  const User = { ...store.getState().User };
  const Translations = { ...store.getState().Translations };
  const Board: any = await FIREBASE_GetPublicBoard(BoardId);

  var Error = "";

  if (!!Board?.BoardId) {
    const UserInCollaborators = Board.Collaborators.find((user: any) => user.Uid === User.uid);

    if (Board.Public || UserInCollaborators?.Uid) {
      //store.dispatch(SetBoard(Board));
      return { Error, Board };
    } else {
      Error = Translations.Text.BoardAccessDenied;
      return { Error, ErrorCode: "BoardAccessDenied" };
    }
  } else {
    Error = Translations.Text.BoardNotFound;
    return { Error, ErrorCode: "BoardNotFound" };
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

      var NewBoardListItem: BoardListItemType = { ...BoardListItem, LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

      FIREBASE_CreateBoardList(NewBoardListItem);

      if (localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`)) {
        var NewBoard = { ...(JSON.parse(localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`) || "") || { ...ExampleBoard }), LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

        FIREBASE_CreateBoard(NewBoard);
      }
    });
  } else {
    var NewId = v4();
    var NewBoardListItem: BoardListItemType = { ...DefaultBoardList[0], LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };
    var NewBoard = { ...ExampleBoard, LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

    FIREBASE_CreateBoard(NewBoard);
    FIREBASE_CreateBoardList(NewBoardListItem);
  }
  GetBoardList();
};

export const MIDDLEWARE_GetUser = async (Uid: string, Email: string) => {
  if (!Uid || !Email) return;

  const Data = await FIREBASE_GetUser(Uid);

  MIDDLEWARE_GetUserPreferences(Uid);

  if (Data.length !== 0) return;

  const NewUser = {
    Uid: Uid,
    Email: Email,
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
    docID: "",
    displayName: "",
    photoURL: "",
  };

  const NewUserPreference = {
    ...DefaultNewUserPreference,
    Uid: Uid,
    Theme: store.getState().Theme,
    CardWidth: store.getState().CardWidth,
    Language: store.getState().Language,
  };

  //@ts-ignore
  const NewUserDoc = await FIREBASE_CreateUser(NewUser);
  const UserPrefenceDoc = await FIREBASE_CreateUserPreferences(NewUserPreference);

  const UpdatedUserPreference = {
    ...NewUserPreference,
    Uid: UserPrefenceDoc.id,
  };

  //@ts-ignore
  store.dispatch(SetUserPreferences(UpdatedUserPreference));

  FIREBASE_UpdateUserPreferences(UpdatedUserPreference);

  SyncCurrentUserWork(Uid);
};

export const MIDDLEWARE_GetUserByEmail = async (Email: string) => {
  const Data = await FIREBASE_GetUserByEmail(Email);

  return Data;
};

export const MIDDLEWARE_GetAllUsers = async () => {
  const Data = await FIREBASE_GetAllUsers();

  return Data || [];
};

export const MIDDLEWARE_GetUserPreferences = async (Uid: string) => {
  const UserPreferences: any = await FIREBASE_GetUserPreferences(Uid);

  if (!!UserPreferences?.docID) {
    //@ts-ignore
    store.dispatch(SetUserPreferences(UserPreferences));
    store.dispatch(SetTheme(UserPreferences.Theme));
    store.dispatch(SetCardWidth(UserPreferences.CardWidth));
    store.dispatch(SetLanguage(UserPreferences.Language));

    localStorage.setItem("Kanban-Language", UserPreferences.Language);
    localStorage.setItem("Kanban-Theme", UserPreferences.Theme);
    localStorage.setItem("Kanban-CardWidth", UserPreferences.CardWidth);

    MIDDLEWARE_SetTranslations(UserPreferences.Language);
  } else {
    const Language = localStorage.getItem("Kanban-Language") || "English";
    store.dispatch(SetLanguage(Language));

    MIDDLEWARE_SetTranslations(Language);
  }
};
