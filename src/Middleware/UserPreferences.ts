import { FIREBASE_CreateUserPreferences, FIREBASE_GetUserPreferences, FIREBASE_UpdateUserPreferences } from "@/Config/Firebase/Firestore";
import { DefaultNewUserPreference } from "@/Config/Store/UserPreferences/UserPreferences";
import { STORE_GET, STORE_HandleChageTheme, STORE_SetLanguage, STORE_SetTranslations, STORE_SetUserPreferences } from "./Store";
import { UserPrefenceType } from "@/Data/Types";
import { LOCALSTORAGE_GetItem } from "./LocalStorage";

export const MIDDLEWARE_CreateUserPreferences = (NewUserPreference: UserPrefenceType) => {
  return FIREBASE_CreateUserPreferences(NewUserPreference);
};

export const MIDDLEWARE_UpdateUserPreferences = (NewUserPreference: UserPrefenceType) => {
  return FIREBASE_UpdateUserPreferences(NewUserPreference);
};

export const MIDDLEWARE_GetUserPreferences = async (Uid: string) => {
  const UserPreferences: any = await FIREBASE_GetUserPreferences(Uid);

  if (!!UserPreferences?.docID) {
    STORE_SetUserPreferences(UserPreferences);
    STORE_SetTranslations(UserPreferences.Language);
  } else {
    const Language = LOCALSTORAGE_GetItem("Kanban-Language") || "English";
    STORE_SetLanguage(Language);
  }
};

export const MIDDLEWARE_ToggleTheme = () => {
  const Theme = STORE_GET("Theme") || "Light";
  const UserUid = STORE_GET("User")?.uid || "";
  const UserPreferences: UserPrefenceType = { ...STORE_GET("UserPreferences") } || { ...DefaultNewUserPreference };

  const NewTheme = Theme === "Dark" ? "Light" : "Dark";

  UserPreferences.Theme = NewTheme

  STORE_HandleChageTheme(NewTheme);

  if (UserUid) {
    MIDDLEWARE_UpdateUserPreferences(UserPreferences);
  }
};
