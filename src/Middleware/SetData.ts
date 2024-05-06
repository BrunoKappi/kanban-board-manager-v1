import { FIREBASE_UpdateBoard, FIREBASE_UpdateBoardListItem } from "@/Config/Firebase/Firestore";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
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

  NewBoard.LastEditedAt = moment().valueOf();

  var NewBoardList: any = [...store.getState().BoardList];

  NewBoardList = [...NewBoardList].map((BoardListItem: any) => {
    const NewItem = { ...BoardListItem };
    if (NewItem.BoardId === NewBoard.BoardId) {
      NewItem.LastEditedAt = NewBoard.LastEditedAt;
      NewItem.BoardName = NewBoard.BoardName;
      NewItem.BoardId = NewBoard.BoardId;
      NewItem.OwnerUid = NewBoard.OwnerUid;
    }
    return NewItem;
  });

  //@ts-ignore
  const NewBoardListItem: BoardListItemType = { ...store.getState().BoardList.find((Item: BoardListItemType) => Item.BoardId === NewBoard.BoardId) };

  NewBoardListItem.LastEditedAt = NewBoard.LastEditedAt;
  NewBoardListItem.BoardName = NewBoard.BoardName;
  NewBoardListItem.BoardId = NewBoard.BoardId;
  NewBoardListItem.OwnerUid = NewBoard.OwnerUid;

  store.dispatch(SetBoard(NewBoard));
  store.dispatch(SetBoardList(NewBoardList));

  localStorage.setItem(`Kanban-Board-${NewBoard.BoardId}`, JSON.stringify(NewBoard));
  localStorage.setItem(`Kanban-BoardListItem-${NewBoard.BoardId}`, JSON.stringify(NewBoardListItem));
  localStorage.setItem(`Kanban-BoardList`, JSON.stringify(NewBoardList));

  if (UserUid) {
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

  if (Theme === "Dark") {
    localStorage.setItem("Kanban-Theme", "Light");
    store.dispatch(SetTheme("Light"));
    store.dispatch(SetUserPreferencesTheme("Light"));
    UserPreferences.Theme = "Light";
  } else {
    localStorage.setItem("Kanban-Theme", "Dark");
    store.dispatch(SetTheme("Dark"));
    store.dispatch(SetUserPreferencesTheme("Dark"));
    UserPreferences.Theme = "Dark";
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
