import { FIREBASE_UpdateBoard, FIREBASE_UpdateBoardListItem, FIREBASE_UpdateUserPreferences } from "@/Config/Firebase/Firestore";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetLoadingBoard } from "@/Config/Store/Loading/LoadingBoard";
import { SetLoadingSidebar } from "@/Config/Store/Loading/LoadingSidebar";
import { SetSidebar } from "@/Config/Store/Sidebar/Sidebar";
import store from "@/Config/Store/Store";
import { SetTheme } from "@/Config/Store/Theme/Theme";
import { SetTranslations } from "@/Config/Store/Translations/Translations";
import { DefaultNewUserPreference, SetUserPreferencesTheme } from "@/Config/Store/UserPreferences/UserPreferences";
import { TRANSLATIONS_ENGLISH } from "@/Data/Translations_English";
import { TRANSLATIONS_SPANISH } from "@/Data/Translations_Espanish";
import { TRANSLATIONS_FRENCH } from "@/Data/Translations_French";
import { TRANSLATIONS_GERMAN } from "@/Data/Translations_German";
import { TRANSLATIONS_PORTUGUESE } from "@/Data/Translations_PortugueseBr";
import { BoardListItemType } from "@/Data/Types";
import moment from "moment";

export const MIDDLEWARE_UpdateBoard = (BoardParam: any) => {
  const NewBoard = { ...BoardParam };
  const UserUid = store.getState().User?.uid || "";
  const CanEditBoard = store.getState().CanEditBoard;
  const IsBoardOwner = store.getState().IsBoardOwner;
  var IsOneOfTheOwners = false;

  NewBoard.Collaborators.forEach((Collab: any) => {
    if (Collab.Uid === UserUid) {
      IsOneOfTheOwners = true;
    }
  });

  NewBoard.LastEditedAt = moment().valueOf();

  var NewBoardList: any = [...store.getState().BoardList];
  NewBoardList = [...NewBoardList].map((BoardListItem: any) => {
    const NewItem = { ...BoardListItem };
    if (NewItem.BoardId === NewBoard.BoardId) {
      NewItem.LastEditedAt = NewBoard.LastEditedAt;
      NewItem.BoardName = NewBoard.BoardName;
      NewItem.BoardId = NewBoard.BoardId;
      //NewItem.OwnerUid = NewBoard.OwnerUid;
      NewItem.IsBoardShared = NewItem.IsBoardShared;
    }
    return NewItem;
  });

  //@ts-ignore
  const NewBoardListItem: BoardListItemType = { ...store.getState().BoardList.find((Item: BoardListItemType) => Item.BoardId === NewBoard.BoardId) };

  NewBoardListItem.LastEditedAt = NewBoard.LastEditedAt;
  NewBoardListItem.BoardName = NewBoard.BoardName;
  NewBoardListItem.BoardId = NewBoard.BoardId;

  //NewBoardListItem.OwnerUid = NewBoard.OwnerUid;

  store.dispatch(SetBoard(NewBoard));
  store.dispatch(SetBoardList(NewBoardList));

  localStorage.setItem(`Kanban-Board-${NewBoard.BoardId}`, JSON.stringify(NewBoard));
  localStorage.setItem(`Kanban-BoardListItem-${NewBoard.BoardId}`, JSON.stringify(NewBoardListItem));
  localStorage.setItem(`Kanban-BoardList`, JSON.stringify(NewBoardList));

  if ((UserUid && CanEditBoard) || IsBoardOwner || IsOneOfTheOwners) {
    FIREBASE_UpdateBoard(NewBoard);
    FIREBASE_UpdateBoardListItem(NewBoardListItem);
  }
};

export const MIDDLEWARE_ToggleSidebar = () => {
  const Sidebar = store.getState().Sidebar || "Opened";

  if (Sidebar === "Closed") {
    //localStorage.setItem("Kanban-Sidebar", "Opened");
    store.dispatch(SetSidebar("Opened"));
  } else {
    // localStorage.setItem("Kanban-Sidebar", "Closed");
    store.dispatch(SetSidebar("Closed"));
  }
};

export const MIDDLEWARE_ToggleTheme = () => {
  const Theme = store.getState().Theme || "Light";
  const UserPreferences = { ...store.getState().UserPreferences } || { ...DefaultNewUserPreference };

  const UserUid = store.getState().User?.uid || "";

  setTimeout(() => {
    store.dispatch(SetLoadingSidebar(false));
  }, 10);

  if (Theme === "Dark") {
    localStorage.setItem("Kanban-Theme", "Light");
    store.dispatch(SetTheme("Light"));
    store.dispatch(SetUserPreferencesTheme("Light"));
    MIDDLEWARE_SetLoadingSidebar(false);
    UserPreferences.Theme = "Light";
  } else {
    localStorage.setItem("Kanban-Theme", "Dark");
    store.dispatch(SetTheme("Dark"));

    store.dispatch(SetUserPreferencesTheme("Dark"));
    MIDDLEWARE_SetLoadingSidebar(false);
    UserPreferences.Theme = "Dark";
  }

  if (UserUid) {
    FIREBASE_UpdateUserPreferences(UserPreferences);
  }
};

export const MIDDLEWARE_SetTranslations = (Language: string) => {
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
    store.dispatch(SetTranslations(TRANSLATIONS_FRENCH));
  } else if (Language === "German") {
    //@ts-ignore
    store.dispatch(SetTranslations(TRANSLATIONS_GERMAN));
  }
};

export const MIDDLEWARE_SetLoadingSidebar = (State: boolean) => {
  if (State) {
    store.dispatch(SetLoadingSidebar(true));
    setTimeout(() => {
      store.dispatch(SetLoadingSidebar(false));
    }, 1000);
  } else {
    store.dispatch(SetLoadingSidebar(false));
  }
};

export const MIDDLEWARE_SetLoadingBoard = (State: boolean) => {
  if (State) {
    store.dispatch(SetLoadingBoard(true));
    setTimeout(() => {
      store.dispatch(SetLoadingBoard(false));
    }, 1000);
  } else {
    store.dispatch(SetLoadingBoard(false));
  }
};

export const MIDDLEWARE_SyncBoard = (Data: any) => {
  const Board = store.getState().Board;
  //@ts-ignore
  if (Data?.docID === Board?.docID) {
    //@ts-ignore
    store.dispatch(SetBoard(Data));
  }
};
