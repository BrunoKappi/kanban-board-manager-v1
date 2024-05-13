import { LOCALSTORAGE_GetItem } from "@/Middleware/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

export const LanguageSlice = createSlice({
  name: "Language",
  initialState: LOCALSTORAGE_GetItem("Kanban-Language") || "English",
  reducers: {
    SetLanguage: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;
