import { createSlice } from "@reduxjs/toolkit";

export const BoardListSlice = createSlice({
  name: "BoardList",
  initialState: [],
  reducers: {
    //@ts-ignore
    SetBoardList: (state, action: any) => {
      //@ts-ignore
      return (state = [...action.payload]);
    },
  },
});

export const { SetBoardList } = BoardListSlice.actions;

export default BoardListSlice.reducer;
