import { createSlice } from "@reduxjs/toolkit";

export const LanguageSlice = createSlice({
  name: "Language",
  initialState: localStorage.getItem("Kanban-Language") || "English",
  reducers: {
    SetLanguage: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetLanguage } = LanguageSlice.actions;

export default LanguageSlice.reducer;
