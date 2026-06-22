import { LOCALSTORAGE_GetItem } from "@/Middleware/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "Theme",
  initialState: LOCALSTORAGE_GetItem("Kanban-Theme") || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'Light' : 'Dark'),
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
