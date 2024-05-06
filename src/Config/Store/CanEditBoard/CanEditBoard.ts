import { createSlice } from "@reduxjs/toolkit";

export const CanEditBoardSlice = createSlice({
  name: "CanEditBoard",
  initialState: true,
  reducers: {
    SetCanEditBoard: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetCanEditBoard } = CanEditBoardSlice.actions;

export default CanEditBoardSlice.reducer;
