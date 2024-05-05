import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/User";
import ThemeSlice from "./Theme/Theme";
import SidebarSlice from "./Sidebar/Sidebar";
import SelectedBoardSlice from "./SelectedBoard/SelectedBoard";
import BoardsSlice from "./Boards/Boards";
import BoardSlice from "./Board/Boards";
import BoardListSlice from "./BoardList/BoardList";
import CardModalSlice from "./CardModal/CardModal";
import CardWidthSlice from "./CardWidth/CardWidth";
import TagsFilterSlice from "./TagsFilter/TagsFilter";
import SearchFilterSlice from "./SearchFilter/CardWidth";
import UserPreferences from "./UserPreferences/UserPreferences";
import LanguageSlice from "./Language/Language";
import TranslationsSlice from "./Translations/Translations";

const store = configureStore({
  reducer: {
    User: UserSlice,
    Theme: ThemeSlice,
    Language: LanguageSlice,
    Sidebar: SidebarSlice,
    SelectedBoard: SelectedBoardSlice,
    Boards: BoardsSlice,
    Board: BoardSlice,
    BoardList: BoardListSlice,
    CardModal: CardModalSlice,
    CardWidth: CardWidthSlice,
    TagsFilter: TagsFilterSlice,
    SearchFilter: SearchFilterSlice,
    UserPreferences: UserPreferences,
    Translations: TranslationsSlice,
  },
});

const logChanges = () => {
  //console.log("LOG STORE", store.getState());
};

export const unsubscribe = store.subscribe(logChanges);
export default store;
