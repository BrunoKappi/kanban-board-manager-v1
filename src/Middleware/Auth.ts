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

      const NewUser: UserType = {
        uid: UserUid,
        Email: email,
        CreatedAt: moment().valueOf(),
        LastEditedAt: moment().valueOf(),
        docID: "",
        displayName: Data.user.displayName || "",
        photoURL: Data.user.photoURL || "",
        loading: false,
      };

      const NewUserPreference = {
        ...DefaultNewUserPreference,
        Uid: UserUid,
        Theme: STORE_GET("Theme"),
        CardWidth: STORE_GET("CardWidth"),
        Language: STORE_GET("Language"),
      };

      //@ts-ignore
      const NewUserDoc = await FIREBASE_CreateUser(NewUser);
      const UserPrefenceDoc = await FIREBASE_CreateUserPreferences(NewUserPreference);

      const UpdatedUserPreference = {
        ...NewUserPreference,
        Uid: UserPrefenceDoc.id,
      };

      STORE_SetUserPreferences(UpdatedUserPreference);

      if (LOCALSTORAGE_GetItem(`Kanban-BoardList`)) {
        const LocalStorageBoardList = getKeysWithSubstring("Kanban-BoardListItem-");

        LocalStorageBoardList.map((LocalBoardListString: string) => {
          var BoardListItem = { ...JSON.parse(LOCALSTORAGE_GetItem(LocalBoardListString) || "") };
          var NewId = v4();

          var NewBoardListItem: BoardListItemType = { ...BoardListItem, LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

          FIREBASE_CreateBoardList(NewBoardListItem);

          if (LOCALSTORAGE_GetItem(`Kanban-Board-${BoardListItem.BoardId}`)) {
            var NewBoard = { ...JSON.parse(LOCALSTORAGE_GetItem(`Kanban-Board-${BoardListItem.BoardId}`) || ""), LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

            FIREBASE_CreateBoard(NewBoard);
          }

          setTimeout(() => {
            setOpen(false);
            FIREBASE_GetBoardList(UserUid);
          }, 1000);
          setTimeout(() => {
            setOpen(false);
            FIREBASE_GetBoardList(UserUid);
          }, 2000);
        });
      } else {
        var NewId = v4();
        const Language = STORE_GET("Language");
        var OriginalBoard = { ...JSON.parse(JSON.stringify(ExampleBoard)), LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };
        var NewBoard = { ...GetText(Language) };

        for (let i = 0; i < OriginalBoard.Columns.length; i++) {
          //@ts-ignore
          OriginalBoard.Columns[i].ColumnTitle = NewBoard.Columns[`Column${i + 1}`].Title;

          for (let j = 0; j < OriginalBoard.Columns[i].Cards.length; j++) {
            //@ts-ignore
            OriginalBoard.Columns[i].Cards[j].CardTitle = NewBoard.Columns[`Column${i + 1}`].Cards[`Card${j + 1}`].Title;

            for (let k = 0; k < OriginalBoard.Columns[i].Cards[j].Tasks.length; k++) {
              //@ts-ignore
              OriginalBoard.Columns[i].Cards[j].Tasks[k].TaskTitle = NewBoard.Columns[`Column${i + 1}`].Cards[`Card${j + 1}`].Tasks[`Task${k + 1}`];
            }
          }
        }

        OriginalBoard.BoardName = NewBoard.Board?.Name;
        OriginalBoard.Description = NewBoard.Board?.Description;

        var NewBoardListItem: BoardListItemType = {
          ...DefaultBoardList[0],
          BoardId: OriginalBoard.BoardId,
          BoardName: OriginalBoard.BoardName,
          LastEditedAt: moment().valueOf(),
          OwnerUid: UserUid,
          IsBoardShared: false,
        };

        LOCALSTORAGE_SetItem(`Kanban-Board-${OriginalBoard.BoardId}`, JSON.stringify(OriginalBoard));
        LOCALSTORAGE_SetItem(`Kanban-BoardListItem-${OriginalBoard.BoardId}`, JSON.stringify(NewBoardListItem));
        LOCALSTORAGE_SetItem(`Kanban-BoardList`, JSON.stringify([NewBoardListItem]));

        FIREBASE_CreateBoard(OriginalBoard);
        FIREBASE_CreateBoardList(NewBoardListItem);
        setTimeout(() => {
          STORE_SetBoardList([NewBoardListItem]);
          STORE_SetSelectedBoard(NewBoardListItem.BoardId);
          STORE_SetBoard(OriginalBoard);
          setOpen(false);
        }, 1000);
        setTimeout(() => {
          STORE_SetBoardList([NewBoardListItem]);
          STORE_SetSelectedBoard(NewBoardListItem.BoardId);
          STORE_SetBoard(OriginalBoard);
          setOpen(false);
        }, 3500);
      }
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
