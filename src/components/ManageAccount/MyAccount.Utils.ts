import { dbUploadFile } from "@/services/storage";
import { UserType } from "@/Config/Store/User/User";
import { STORE_GET, STORE_SetUser } from "@/Middleware/Store";
import { MIDDLEWARE_GetUser, MIDDLEWARE_UpdateUser } from "@/Middleware/User";
import { dbGetUser, dbGetUserPreferences, dbGetDocBoards, dbGetBoardList, dbDeleteAllUserData } from "@/services/db";
import { authDeleteCurrentUser } from "@/services/auth";

export const handleSetFileToUpload = (file: any, setFileToUpload: any, setErrorMessage: any) => {
  const AllowedTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp", "image/bmp", "image/tiff"]; // Tipos de imagem comuns
  const FileType = file.type;
  const Translations = STORE_GET("Translations");

  if (file.size <= 10148205) {
    if (AllowedTypes.includes(FileType)) {
      setFileToUpload(file);
    } else {
      setErrorMessage(Translations.MyAccount.ErrorFormat);
      setTimeout(() => setErrorMessage(""), 2500);
    }
  } else {
    setErrorMessage(Translations.MyAccount.ErrorSize);
    setTimeout(() => setErrorMessage(""), 2500);
  }
};

export const HandleUploadFile = (file: File, User: UserType) => {
  return dbUploadFile(file, `ProfilePictures/${User.uid}`);
};

export const SaveUserInfo = async (file: File, User: UserType, DisplayName: string, HandleResetAll: any, setLoading: any, setErrorMessage: any) => {
  const Translations = STORE_GET("Translations");
  var URL;
  var UserDoc: UserType[] | null = null;
  setLoading(true);
  if (file) {
    URL = await HandleUploadFile(file, User);
  }

  var NewUser: UserType = {
    ...User,
    displayName: DisplayName,
    photoURL: URL || User.photoURL,
  };

  if (!NewUser.docID) {
    UserDoc = await MIDDLEWARE_GetUser(User.uid);
  }

  if (UserDoc && UserDoc.length > 0) {
    NewUser.docID = UserDoc[0].docID;
  }

  MIDDLEWARE_UpdateUser(NewUser)
    .then(() => {
      STORE_SetUser(NewUser);
      HandleResetAll();
      setLoading(false);
    })
    .catch(() => {
      setErrorMessage(Translations.MyAccount.Error);
      setTimeout(() => setErrorMessage(""), 2500);
      setLoading(false);
      HandleResetAll();
    });
};

export const ExportUserData = async (User: UserType, setLoading: (loading: boolean) => void, setErrorMessage: (msg: string) => void) => {
  const Translations = STORE_GET("Translations");
  setLoading(true);
  try {
    const userDoc = await dbGetUser(User.uid);
    const preferencesDoc = await dbGetUserPreferences(User.uid);
    const boards = await dbGetDocBoards(User.uid);
    const boardList = await dbGetBoardList(User.uid);

    const exportObj = {
      exportedAt: new Date().toISOString(),
      regulation: "LGPD - Lei Geral de Proteção de Dados do Brasil (Lei nº 13.709/18)",
      userProfile: userDoc?.[0] || { uid: User.uid, email: User.Email, displayName: User.displayName },
      preferences: preferencesDoc || null,
      boards: boards || [],
      boardList: boardList || []
    };

    const blob = new Blob([JSON.stringify(exportObj, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `kanban-data-export-${User.uid}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setLoading(false);
  } catch (error) {
    console.error("Export error:", error);
    setErrorMessage(Translations.MyAccount.Error);
    setTimeout(() => setErrorMessage(""), 3000);
    setLoading(false);
  }
};

export const DeleteUserAccount = async (User: UserType, handleClearAndLogout: () => void, setLoading: (loading: boolean) => void, setErrorMessage: (msg: string) => void) => {
  const Translations = STORE_GET("Translations");
  setLoading(true);
  try {
    // 1. Wipe Firestore documents
    await dbDeleteAllUserData(User.uid);
    
    // 2. Wipe Firebase auth user
    await authDeleteCurrentUser();
    
    setLoading(false);
    // 3. Logout and reset local preferences
    handleClearAndLogout();
  } catch (error: any) {
    console.error("Deletion error:", error);
    if (error?.code === "auth/requires-recent-login" || error?.message?.includes("recent-login")) {
      setErrorMessage(Translations.MyAccount.DeleteAccountRequiresRecentLogin || "Por segurança, você precisa sair e fazer login novamente antes de excluir sua conta.");
    } else {
      setErrorMessage(Translations.MyAccount.Error);
    }
    setTimeout(() => setErrorMessage(""), 6000);
    setLoading(false);
  }
};
