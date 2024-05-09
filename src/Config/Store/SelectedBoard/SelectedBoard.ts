import { createSlice } from "@reduxjs/toolkit";

export const SelectedBoardSlice = createSlice({
  name: "SelectedBoard",
  initialState: "",
  reducers: {
    SetSelectedBoard: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetSelectedBoard } = SelectedBoardSlice.actions;

export default SelectedBoardSlice.reducer;
