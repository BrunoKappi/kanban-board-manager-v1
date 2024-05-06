import { createSlice } from "@reduxjs/toolkit";

export const CanDuplicateBoardSlice = createSlice({
  name: "CanDuplicateBoard",
  initialState: true,
  reducers: {
    SetCanDuplicateBoard: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetCanDuplicateBoard } = CanDuplicateBoardSlice.actions;

export default CanDuplicateBoardSlice.reducer;
