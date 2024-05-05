import { FIREBASE_GetUserPreferences, FIREBASE_UpdateUserPreferences } from "./../Config/Firebase/Firestore";
import { getKeysWithSubstring } from "@/components/ManageAccount/Register.Utils";
import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList, FIREBASE_CreateUser, FIREBASE_CreateUserPreferences, FIREBASE_GetBoard, FIREBASE_GetBoardList, FIREBASE_GetUser } from "@/Config/Firebase/Firestore";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import { SetCardWidth } from "@/Config/Store/CardWidth/CardWidth";
import { SetLanguage } from "@/Config/Store/Language/Language";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";
import { SetTheme } from "@/Config/Store/Theme/Theme";
import { SetTranslations } from "@/Config/Store/Translations/Translations";
import { DefaultNewUserPreference, SetUserPreferences } from "@/Config/Store/UserPreferences/UserPreferences";
import { DefaultBoardList } from "@/Data/BoardList";
import { Boards } from "@/Data/Boards";
import { ExampleBoard1 } from "@/Data/ExampleBoard1";
import { ExampleBoard1_PortugueseBr } from "@/Data/ExampleBoard1_PortugueseBr";
import { TRANSLATIONS_ENGLISH } from "@/Data/Translations_English";
import { TRANSLATIONS_SPANISH } from "@/Data/Translations_Espanish";
import { TRANSLATIONS_FRENCH } from "@/Data/Translations_French";
import { TRANSLATIONS_GERMAN } from "@/Data/Translations_German";
import { TRANSLATIONS_PORTUGUESE } from "@/Data/Translations_PortugueseBr";
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

  MIDDLEWARE_GetUserPreferences(Uid);

  if (Data.length !== 0) return;

  const NewUser = {
    Uid: Uid,
    Email: Email,
    CreatedAt: moment().valueOf(),
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

export const MIDDLEWARE_GetUserPreferences = async (Uid: string) => {
  const UserPreferences: any = await FIREBASE_GetUserPreferences(Uid);

  if (!!UserPreferences.docID) {
    //@ts-ignore
    store.dispatch(SetUserPreferences(UserPreferences));
    store.dispatch(SetTheme(UserPreferences.Theme));
    store.dispatch(SetCardWidth(UserPreferences.CardWidth));
    store.dispatch(SetLanguage(UserPreferences.Language));

    localStorage.setItem("Kanban-Language", UserPreferences.Language);
    localStorage.setItem("Kanban-Theme", UserPreferences.Theme);
    localStorage.setItem("Kanban-CardWidth", UserPreferences.CardWidth);

    if (UserPreferences.Language === "English") {
      //@ts-ignore
      store.dispatch(SetTranslations(TRANSLATIONS_ENGLISH));
    } else if (UserPreferences.Language === "Portuguese-br") {
      //@ts-ignore
      store.dispatch(SetTranslations(TRANSLATIONS_PORTUGUESE));
    } else if (UserPreferences.Language === "Spanish") {
      //@ts-ignore
      store.dispatch(SetTranslations(TRANSLATIONS_SPANISH));
    } else if (UserPreferences.Language === "French") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_FRENCH));
    } else if (UserPreferences.Language === "German") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_GERMAN));
    }
  } else {
    const Language = localStorage.getItem("Kanban-Language") || "English";
    store.dispatch(SetLanguage(Language));

    if (Language === "English") {
      //@ts-ignore
      store.dispatch(SetTranslations(TRANSLATIONS_ENGLISH));
    } else if (Language === "Portuguese-br") {
      //@ts-ignore
      store.dispatch(SetTranslations(TRANSLATIONS_PORTUGUESE));
    } else if (Language === "Spanish") {
      //@ts-ignore
      store.dispatch(SetTranslations(TRANSLATIONS_SPANISH));
    } else if (Language === "French") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_FRENCH));
    } else if (Language === "German") {
      //@ts-ignore
      dispatch(SetTranslations(TRANSLATIONS_GERMAN));
    }
  }
};

export const MIDDLEWARE_GetExampleBoard = () => {
  const CurrentLanguage = store.getState().Language;

  if (CurrentLanguage === "English") {
    return { ...ExampleBoard1 };
  } else if (CurrentLanguage === "Portuguese-br") {
    return { ...ExampleBoard1_PortugueseBr };
  }
};
