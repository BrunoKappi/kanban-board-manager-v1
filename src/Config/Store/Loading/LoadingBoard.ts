import { createSlice } from "@reduxjs/toolkit";

export const LoadingBoardSlice = createSlice({
  name: "LoadingBoard",
  initialState: false,
  reducers: {
    SetLoadingBoard: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetLoadingBoard } = LoadingBoardSlice.actions;

export default LoadingBoardSlice.reducer;
