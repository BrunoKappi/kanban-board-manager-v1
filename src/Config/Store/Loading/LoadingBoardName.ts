import { createSlice } from "@reduxjs/toolkit";

export const LoadingBoardNameSlice = createSlice({
  name: "LoadingBoardName",
  initialState: true,
  reducers: {
    SetLoadingBoardName: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetLoadingBoardName } = LoadingBoardNameSlice.actions;

export default LoadingBoardNameSlice.reducer;

