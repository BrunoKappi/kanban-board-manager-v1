
import { TRANSLATIONS_ENGLISH } from "@/Data/Translations_English";
import { TRANSLATIONS_PORTUGUESE } from "@/Data/Translations_PortugueseBr";
import { createSlice } from "@reduxjs/toolkit";

export const TranslationsSlice = createSlice({
  name: "Translations",
  initialState: TRANSLATIONS_PORTUGUESE,

  reducers: {
    SetTranslations: (state, action: any) => {
      return (state = { ...action.payload });
    },
  },
});

export const { SetTranslations } = TranslationsSlice.actions;

export default TranslationsSlice.reducer;
