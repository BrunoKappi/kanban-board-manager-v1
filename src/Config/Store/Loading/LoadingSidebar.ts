import { createSlice } from "@reduxjs/toolkit";

export const LoadingSidebarSlice = createSlice({
  name: "LoadingSidebar",
  initialState: false,
  reducers: {
    SetLoadingSidebar: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetLoadingSidebar } = LoadingSidebarSlice.actions;

export default LoadingSidebarSlice.reducer;

