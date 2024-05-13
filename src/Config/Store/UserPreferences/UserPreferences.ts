import { UserPrefenceType } from "@/Data/Types";
import { createSlice } from "@reduxjs/toolkit";

export const DefaultNewUserPreference: UserPrefenceType = {
  uid: "",
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
    SetUserPreferences: (state, action) => {
      return (state = { ...action.payload });
    },

    SetUserPreferencesTheme: (state, action) => {
      const value = action.payload;
      state.Theme = value; // action.payload.username
    },
    SetUserPreferencesLanguage: (state, action) => {
      const value = action.payload;
      state.Language = value;
    },
    SetUserPreferencesCardWidth: (state, action) => {
      const value = action.payload;
      state.CardWidth = value;
    },
    SetUserPreferencesUid: (state, action) => {
      const value = action.payload;
      state.uid = value;
    },
    SetUserPreferencesdocID: (state, action) => {
      const value = action.payload;
      state.docID = value;
    },
  },
});

export const { SetUserPreferences, SetUserPreferencesTheme, SetUserPreferencesLanguage, SetUserPreferencesCardWidth, SetUserPreferencesUid, SetUserPreferencesdocID } = UserPreferencesSlice.actions;

export default UserPreferencesSlice.reducer;
