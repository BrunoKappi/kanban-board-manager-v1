import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetCanDuplicateBoard } from "@/Config/Store/CanDuplicateBoard/CanDuplicateBoard";
import { SetCanEditBoard } from "@/Config/Store/CanEditBoard/CanEditBoard";
import { SetCardModalCard, SetCardModalCardIndex, SetCardModalCardTags, SetCardModalCardTitle, SetCardModalColumnIndex, SetCardModalMode } from "@/Config/Store/CardModal/CardModal";
import { SetCardWidth } from "@/Config/Store/CardWidth/CardWidth";
import { SetIsBoardOwner } from "@/Config/Store/IsBoardOwner/IsBoardOwner";
import { SetLanguage } from "@/Config/Store/Language/Language";
import { SetLoadingBoard } from "@/Config/Store/Loading/LoadingBoard";
import { SetLoadingSidebar } from "@/Config/Store/Loading/LoadingSidebar";
import { SetSearchFilter } from "@/Config/Store/SearchFilter/CardWidth";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import { SetSidebar } from "@/Config/Store/Sidebar/Sidebar";
import store, { SliceName } from "@/Config/Store/Store";
import { SetTagsFilter } from "@/Config/Store/TagsFilter/TagsFilter";
import { SetTheme } from "@/Config/Store/Theme/Theme";
import { SetTranslations } from "@/Config/Store/Translations/Translations";
import { SetUser, UserType } from "@/Config/Store/User/User";
import { SetUserPreferences, SetUserPreferencesdocID, SetUserPreferencesTheme } from "@/Config/Store/UserPreferences/UserPreferences";
import { TRANSLATIONS_ENGLISH } from "@/Data/Translations_English";
import { TRANSLATIONS_SPANISH } from "@/Data/Translations_Espanish";
import { TRANSLATIONS_FRENCH } from "@/Data/Translations_French";
import { TRANSLATIONS_GERMAN } from "@/Data/Translations_German";
import { TRANSLATIONS_PORTUGUESE } from "@/Data/Translations_PortugueseBr";
import { BoardListItemType, BoardType, CardType, UserPrefenceType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { LOCALSTORAGE_RemoveItem, LOCALSTORAGE_SetItem } from "./LocalStorage";

export const STORE_GET = (Slice?: SliceName): ReturnType<typeof store.getState> | ReturnType<typeof store.getState>[SliceName] => {
  if (Slice) {
    const StoreState = Copy(store.getState());
    return Copy(StoreState[Slice]);
  }
  return Copy(store.getState());
};

export const STORE_UpdateBoard = (BoardList: BoardListItemType[], NewBoardListItem: BoardListItemType, NewBoard: BoardType) => {
  const IsBoardOwner = STORE_GET("IsBoardOwner");
  const BoardItemAlredyIn = BoardList.find((Item) => Item.BoardId === NewBoardListItem.BoardId);

  if (!BoardItemAlredyIn?.BoardId && IsBoardOwner) {
    STORE_SetBoardList([...BoardList, NewBoardListItem]);
    LOCALSTORAGE_SetItem(`Kanban-BoardList`, JSON.stringify([...BoardList, NewBoardListItem]));
  } else {
    STORE_SetBoardList([...BoardList]);
    LOCALSTORAGE_SetItem(`Kanban-BoardList`, JSON.stringify([...BoardList]));
  }

  STORE_SetSelectedBoard(NewBoardListItem.BoardId);
  STORE_SetBoard(NewBoard);

  LOCALSTORAGE_SetItem(`Kanban-Board-${NewBoard.BoardId}`, JSON.stringify(NewBoard));
  LOCALSTORAGE_SetItem(`Kanban-BoardListItem-${NewBoard.BoardId}`, JSON.stringify(NewBoardListItem));
};

export const STORE_SetSelectedBoard = (SelectedBoard: string = "NA") => {
  store.dispatch(SetSelectedBoard(SelectedBoard));
};

export const STORE_SetIsBoardOwner = (Value: boolean) => {
  store.dispatch(SetIsBoardOwner(Value));
};

export const STORE_SetCanEditBoard = (Value: boolean) => {
  store.dispatch(SetCanEditBoard(Value));
};

export const STORE_SetCanDuplicateBoard = (Value: boolean) => {
  store.dispatch(SetCanDuplicateBoard(Value));
};

export const STORE_SetBoardList = (BoardList: BoardListItemType[]) => {
  store.dispatch(SetBoardList(BoardList));
};

export const STORE_SetCardModalCard = (Card: CardType | {}) => {
  store.dispatch(SetCardModalCard(Card));
};

export const STORE_SetCardModalCardTitle = (Title: string) => {
  store.dispatch(SetCardModalCardTitle(Title));
};

export const STORE_SetUser = (User: UserType) => {
  store.dispatch(SetUser(User));
};

export const STORE_SetUserPreferencesdocID = (DocId: string) => {
  store.dispatch(SetUserPreferencesdocID(DocId));
};

export const STORE_DeleteBoard = (BoardList: BoardListItemType[], NewBoard: BoardType) => {
  STORE_SetBoardList(BoardList);
  STORE_SetSelectedBoard(BoardList.sort(OrderBoards)[0]?.BoardId || "NA");
  LOCALSTORAGE_SetItem(`Kanban-BoardList`, JSON.stringify(BoardList));
  LOCALSTORAGE_RemoveItem(`Kanban-Board-${NewBoard.BoardId}`);
  LOCALSTORAGE_RemoveItem(`Kanban-BoardListItem-${NewBoard.BoardId}`);
};

export const STORE_SetLoadingBoard = (State: boolean) => {
  if (State) {
    store.dispatch(SetLoadingBoard(true));
    setTimeout(() => {
      store.dispatch(SetLoadingBoard(false));
    }, 1000);
  } else {
    store.dispatch(SetLoadingBoard(false));
  }
};

export const STORE_SyncBoard = (Data: any) => {
  const Board: BoardType = STORE_GET("Board");
  if (Data?.docID === Board?.docID) {
    STORE_SetBoard(Data);
  }
};

export const STORE_SetBoard = (Board: BoardType) => {
  store.dispatch(SetBoard(Board));
};

export const STORE_SetCardWidth = (Width: string) => {
  store.dispatch(SetCardWidth(Width));
};

export const STORE_SetCardModalCardTags = (Tags: string[]) => {
  store.dispatch(SetCardModalCardTags(Tags));
};

export const STORE_SetSearchFilter = (Search: string) => {
  store.dispatch(SetSearchFilter(Search));
};

export const STORE_SetTagsFilter = (TagFilter: string[]) => {
  store.dispatch(SetTagsFilter(TagFilter));
};

export const STORE_SetCardModal = (Mode: string, CardIndex: number, ColumIndex: number, Card: CardType) => {
  store.dispatch(SetCardModalMode(Mode));
  store.dispatch(SetCardModalCardIndex(CardIndex));
  store.dispatch(SetCardModalColumnIndex(ColumIndex));
  STORE_SetCardModalCard(Card);
};

export const STORE_ResetCardModal = () => {
  store.dispatch(SetCardModalMode("NA"));
  store.dispatch(SetCardModalCardIndex(0));
  store.dispatch(SetCardModalColumnIndex(0));
  STORE_SetCardModalCard({});
};

export const STORE_SetTranslations = (Language: string) => {
  if (Language === "English") {
    store.dispatch(SetTranslations(TRANSLATIONS_ENGLISH));
  } else if (Language === "Portuguese-br") {
    store.dispatch(SetTranslations(TRANSLATIONS_PORTUGUESE));
  } else if (Language === "Spanish") {
    store.dispatch(SetTranslations(TRANSLATIONS_SPANISH));
  } else if (Language === "French") {
    store.dispatch(SetTranslations(TRANSLATIONS_FRENCH));
  } else if (Language === "German") {
    store.dispatch(SetTranslations(TRANSLATIONS_GERMAN));
  }
};

export const STORE_SetLoadingSidebar = (State: boolean) => {
  if (State) {
    store.dispatch(SetLoadingSidebar(true));
    setTimeout(() => {
      store.dispatch(SetLoadingSidebar(false));
    }, 1000);
  } else {
    store.dispatch(SetLoadingSidebar(false));
  }
};

export const STORE_ToggleSidebar = () => {
  const Sidebar = store.getState().Sidebar || "Opened";
  if (Sidebar === "Closed") {
    store.dispatch(SetSidebar("Opened"));
  } else {
    store.dispatch(SetSidebar("Closed"));
  }
};

export const STORE_HandleChageTheme = (NewTheme: string) => {
  LOCALSTORAGE_SetItem("Kanban-Theme", NewTheme);
  store.dispatch(SetTheme(NewTheme));
  store.dispatch(SetUserPreferencesTheme(NewTheme));
};

export const STORE_SetUserPreferences = (UserPreferences: UserPrefenceType) => {
  store.dispatch(SetUserPreferences(UserPreferences));
  store.dispatch(SetTheme(UserPreferences.Theme));
  store.dispatch(SetCardWidth(UserPreferences.CardWidth));
  STORE_SetLanguage(UserPreferences.Language);

  LOCALSTORAGE_SetItem("Kanban-Language", UserPreferences.Language);
  LOCALSTORAGE_SetItem("Kanban-Theme", UserPreferences.Theme);
  LOCALSTORAGE_SetItem("Kanban-CardWidth", UserPreferences.CardWidth);

  STORE_SetLanguage(UserPreferences.Language);
};

export const STORE_SetLanguage = (Language: string) => {
  store.dispatch(SetLanguage(Language));
  STORE_SetTranslations(Language);
};
