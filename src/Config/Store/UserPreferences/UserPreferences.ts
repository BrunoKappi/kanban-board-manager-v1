import { createSlice } from "@reduxjs/toolkit";

export const DefaultNewUserPreference = {
  Uid: "",
  Language: "English",
  Theme: "Light",
  CardWidth: "Medium",
  docID: "",
};

export const UserPreferencesSlice = createSlice({
  name: "UserPreferences",
  initialState: {
    ...DefaultNewUserPreference,
  },
  reducers: {
    SetUserPreferences: (state, action: any) => {
      return (state = { ...action.payload });
    },

    SetUserPreferencesTheme: (state, action) => {
      const value = action.payload;
      state.Theme = value; // action.payload.username
    },
    SetUserPreferencesLanguage: (state, action: any) => {
      const value = action.payload;
      state.Language = value;
    },
    SetUserPreferencesCardWidth: (state, action: any) => {
      const value = action.payload;
      state.CardWidth = value;
    },
    SetUserPreferencesUid: (state, action: any) => {
      const value = action.payload;
      state.Uid = value;
    },
    SetUserPreferencesdocID: (state, action: any) => {
      const value = action.payload;
      state.docID = value;
    },
  },
});

export const { SetUserPreferences, SetUserPreferencesTheme, SetUserPreferencesLanguage, SetUserPreferencesCardWidth, SetUserPreferencesUid, SetUserPreferencesdocID } = UserPreferencesSlice.actions;

export default UserPreferencesSlice.reducer;
