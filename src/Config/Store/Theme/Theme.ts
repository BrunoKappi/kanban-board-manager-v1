import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "Theme",
  initialState: localStorage.getItem("Kanban-Theme") || 'Light',
  reducers: {
    Toggle: (state) => {
      return (state = state === "Light" ? "Dark" : "Light");
    },
    SetTheme: (state, action) => {
      return state = action.payload;
    },
  },
});

export const { Toggle,SetTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
