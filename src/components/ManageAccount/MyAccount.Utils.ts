import { UploadFileToFirebase } from "@/Config/Firebase/Storage";
import { UserType } from "@/Config/Store/User/User";
import { STORE_GET, STORE_SetUser } from "@/Middleware/Store";
import { MIDDLEWARE_GetUser, MIDDLEWARE_UpdateUser } from "@/Middleware/User";

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
  return UploadFileToFirebase(file, `ProfilePictures/${User.uid}`);
};

export const SaveUserInfo = async (file: File, User: UserType, DisplayName: string, HandleResetAll: any, setLoading: any, setErrorMessage: any) => {
  const Translations = STORE_GET("Translations");
  var URL;
  var UserDoc: UserType[] = [];
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

  if (UserDoc?.length > 0) {
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
