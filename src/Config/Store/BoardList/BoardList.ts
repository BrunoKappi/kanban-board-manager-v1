import { BoardListItemType } from "@/Data/Types";
import { createSlice } from "@reduxjs/toolkit";

const InitialState: BoardListItemType[] = [];

export const BoardListSlice = createSlice({
  name: "BoardList",
  initialState: InitialState,
  reducers: {
    SetBoardList: (state, action) => {
      return (state = [...action.payload]);
    },
  },
});

export const { SetBoardList } = BoardListSlice.actions;

export default BoardListSlice.reducer;
