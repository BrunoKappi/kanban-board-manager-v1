import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./User/User";
import ThemeSlice from "./Theme/Theme";
import SidebarSlice from "./Sidebar/Sidebar";
import SelectedBoardSlice from "./SelectedBoard/SelectedBoard";
import BoardsSlice from "./Boards/Boards";
import BoardSlice from "./Board/Boards";
import BoardListSlice from "./BoardList/BoardList";
import CardModalSlice from "./CardModal/CardModal";

const store = configureStore({
  reducer: {
    User: UserSlice,
    Theme: ThemeSlice,
    Sidebar: SidebarSlice,
    SelectedBoard: SelectedBoardSlice,
    Boards: BoardsSlice,
    Board: BoardSlice,
    BoardList: BoardListSlice,
    CardModal: CardModalSlice,
  },
});

const logChanges = () => {
  console.log("LOG STORE", store.getState());
};

export const unsubscribe = store.subscribe(logChanges);
export default store;
