import { createSlice } from "@reduxjs/toolkit";

export const BoardSlice = createSlice({
  name: "Board",
  initialState: {},
  reducers: {
    SetBoard: (state, action) => {
      return (state = { ...action.payload });
    },
  },
});

export const { SetBoard } = BoardSlice.actions;

export default BoardSlice.reducer;
