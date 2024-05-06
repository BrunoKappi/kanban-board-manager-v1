import { createSlice } from "@reduxjs/toolkit";

export const IsBoardOwnerSlice = createSlice({
  name: "IsBoardOwner",
  initialState: true,
  reducers: {
    SetIsBoardOwner: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetIsBoardOwner } = IsBoardOwnerSlice.actions;

export default IsBoardOwnerSlice.reducer;
