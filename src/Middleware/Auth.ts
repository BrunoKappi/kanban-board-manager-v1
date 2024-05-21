import { getKeysWithSubstring } from "@/components/ManageAccount/Register.Utils";
import { FIREBASE_LoginWithEmailPassword, FIREBASE_LoginWithGoogle, FIREBASE_RegisterUserEmailPassword, FIREBASE_SendEMailResetPassword } from "@/Config/Firebase/Auth";
import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList, FIREBASE_CreateUser, FIREBASE_CreateUserPreferences, FIREBASE_GetBoardList } from "@/Config/Firebase/Firestore";
import { DefaultBoardList } from "@/Data/BoardList";
import { ExampleBoard, GetText } from "@/Data/ExampleBoard";
import moment from "moment";
import { v4 } from "uuid";
import { DefaultNewUserPreference } from "@/Config/Store/UserPreferences/UserPreferences";
import { BoardListItemType } from "@/Data/Types";
import { MIDDLEWARE_CheckUserOnLogin } from "./User";
import { STORE_SetBoard, STORE_SetSelectedBoard, STORE_SetBoardList, STORE_SetCardModalCard, STORE_SetUserPreferences, STORE_GET } from "./Store";
import { LOCALSTORAGE_GetItem, LOCALSTORAGE_SetItem } from "./LocalStorage";
import { UserType } from "@/Config/Store/User/User";

type MIDDLEWARE_LoginProps = {
  email: string;
  password: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
};

export const MIDDLEWARE_Login = ({ email, password, setOpen, setError }: MIDDLEWARE_LoginProps) => {
  const Translations = STORE_GET("Translations");
  const User: UserType = STORE_GET("User");
  if (User.uid) {
    localStorage.clear();
  }
  FIREBASE_LoginWithEmailPassword(email, password)
    .then((Data) => {
      setOpen(false);

      STORE_SetCardModalCard({});

      MIDDLEWARE_CheckUserOnLogin(Data.user.uid, Data.user.email || "");
    })
    .catch(() => {
      setError(Translations.Login.ErrorEmailOrPassword);
      setTimeout(() => {
        setError("");
      }, 3000);
    });
};

type MIDDLEWARE_LoginGoogleProps = {
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
};

export const MIDDLEWARE_LoginWithGoogle = ({ setOpen, setError }: MIDDLEWARE_LoginGoogleProps) => {
  const Translations = STORE_GET("Translations");
  const User: UserType = STORE_GET("User");
  if (User.uid) {
    localStorage.clear();
  }
  FIREBASE_LoginWithGoogle()
    .then((Data) => {
      setOpen(false);
      //@ts-ignore
      STORE_SetCardModalCard({});

      MIDDLEWARE_CheckUserOnLogin(Data.user.uid, Data.user.email || "");
    })
    .catch(() => {
      //console.log(error);
      setError(Translations.Login.PopupError);
      setTimeout(() => {
        setError("");
      }, 3000);
    });
};

type MIDDLEWARE_ForgotProps = {
  email: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
  setMessage: (message: string) => void;
};

export const MIDDLEWARE_Forgot = ({ email, setOpen, setError, setMessage }: MIDDLEWARE_ForgotProps) => {
  const Translations = STORE_GET("Translations");
  FIREBASE_SendEMailResetPassword(email.toLocaleLowerCase())
    .then(() => {
      //@ts-ignore
      STORE_SetCardModalCard({});
      setMessage(Translations.Forgot.SuccessMessage);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    })
    .catch(() => {
      setError("Invalid Email");
      setTimeout(() => {
        setError("");
      }, 3000);
    });
};

type MIDDLEWARE_RegisterProps = {
  email: string;
  password: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
  setMessage: (message: string) => void;
};

export const MIDDLEWARE_Register = ({ email, password, setOpen, setError, setMessage }: MIDDLEWARE_RegisterProps) => {
  const User: UserType = STORE_GET("User");
  if (User.uid) {
    localStorage.clear();
  }
  const Translations = STORE_GET("Translations");
  FIREBASE_RegisterUserEmailPassword(email.toLocaleLowerCase(), password)
    .then(async (Data) => {
      //@ts-ignore
      STORE_SetCardModalCard({});
      setMessage(Translations.Register.SuccessMessage);
      const UserUid = Data.user.uid;
      setTimeout(() => {
        setOpen(false);
        MIDDLEWARE_CheckUserOnLogin(UserUid, Data.user.email || "");
      }, 500);
      return;
    })
    .catch((error) => {
      if (error?.code?.includes("password")) {
        setError("Password must have at least 6 characters");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      if (error?.code?.includes("already-in-use")) {
        setError("User already registered");
        setTimeout(() => {
          setError("");
        }, 4000);

        return;
      }
      if (error?.code?.includes("invalid-email")) {
        setError("Invalid Email");

        setTimeout(() => {
          setError("");
        }, 3000);

        return;
      }

      setError("Something went wrong, try again later");
      setTimeout(() => {
        setError("");
      }, 3000);
    });
};
