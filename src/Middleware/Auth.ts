import { getKeysWithSubstring } from "@/components/ManageAccount/Register.Utils";
import { FIREBASE_LoginWithEmailPassword, FIREBASE_LoginWithGoogle, FIREBASE_RegisterUserEmailPassword, FIREBASE_SendEMailResetPassword } from "@/Config/Firebase/Auth";
import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList, FIREBASE_CreateUser, FIREBASE_CreateUserPreferences } from "@/Config/Firebase/Firestore";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { DefaultBoardList } from "@/Data/BoardList";
import { ExampleBoard, GetText } from "@/Data/ExampleBoard";
import moment from "moment";
import { v4 } from "uuid";
import { MIDDLEWARE_GetUser } from "./GetData";
import { DefaultNewUserPreference, SetUserPreferences } from "@/Config/Store/UserPreferences/UserPreferences";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { BoardListItemType } from "@/Data/Types";

type MIDDLEWARE_LoginProps = {
  email: string;
  password: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
};

export const MIDDLEWARE_Login = ({ email, password, setOpen, setError }: MIDDLEWARE_LoginProps) => {
  FIREBASE_LoginWithEmailPassword(email, password)
    .then((Data) => {
      setOpen(false);
      //@ts-ignore
      store.dispatch(SetCardModalCard({}));

      MIDDLEWARE_GetUser(Data.user.uid, Data.user.email || "");
    })
    .catch(() => {
      setError("Email or password incorrect");
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
  FIREBASE_LoginWithGoogle()
    .then((Data) => {
      setOpen(false);
      //@ts-ignore
      store.dispatch(SetCardModalCard({}));

      MIDDLEWARE_GetUser(Data.user.uid, Data.user.email || "");
    })
    .catch(() => {
      //console.log(error);
      setError("Something went wrong, try with Email and Password");
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
  FIREBASE_SendEMailResetPassword(email.toLocaleLowerCase())
    .then(() => {
      //@ts-ignore
      store.dispatch(SetCardModalCard({}));
      setMessage(" An email was sent to your email account");
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
  FIREBASE_RegisterUserEmailPassword(email.toLocaleLowerCase(), password)
    .then(async (Data) => {
      //@ts-ignore
      store.dispatch(SetCardModalCard({}));
      setMessage("User registered successfully");
      const UserUid = Data.user.uid;

      const NewUser = {
        Uid: UserUid,
        Email: email,
        CreatedAt: moment().valueOf(),
        LastEditedAt: moment().valueOf(),
        docID: "",
        displayName: "",
        photoURL: "",
      };

      const NewUserPreference = {
        ...DefaultNewUserPreference,
        Uid: UserUid,
        Theme: store.getState().Theme,
        CardWidth: store.getState().CardWidth,
        Language: store.getState().Language,
      };

      //@ts-ignore
      const NewUserDoc = await FIREBASE_CreateUser(NewUser);
      const UserPrefenceDoc = await FIREBASE_CreateUserPreferences(NewUserPreference);

      const UpdatedUserPreference = {
        ...NewUserPreference,
        Uid: UserPrefenceDoc.id,
      };

      //@ts-ignore
      store.dispatch(SetUserPreferences(UpdatedUserPreference));

      //FIREBASE_UpdateUserPreferences(UpdatedUserPreference);

      if (localStorage.getItem(`Kanban-BoardList`)) {
        const LocalStorageBoardList = getKeysWithSubstring("Kanban-BoardListItem-");

        LocalStorageBoardList.map((LocalBoardListString: string) => {
          var BoardListItem = { ...JSON.parse(localStorage.getItem(LocalBoardListString) || "") };
          var NewId = v4();

          var NewBoardListItem: BoardListItemType = { ...BoardListItem, LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

          FIREBASE_CreateBoardList(NewBoardListItem);

          if (localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`)) {
            var NewBoard = { ...JSON.parse(localStorage.getItem(`Kanban-Board-${BoardListItem.BoardId}`) || ""), LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

            FIREBASE_CreateBoard(NewBoard);
          }

          setTimeout(() => {
            setOpen(false);
          }, 3000);
        });
      } else {
        var NewId = v4();
        const Language = store.getState().Language;
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

        localStorage.setItem(`Kanban-Board-${OriginalBoard.BoardId}`, JSON.stringify(OriginalBoard));
        localStorage.setItem(`Kanban-BoardListItem-${OriginalBoard.BoardId}`, JSON.stringify(NewBoardListItem));
        localStorage.setItem(`Kanban-BoardList`, JSON.stringify([NewBoardListItem]));

        FIREBASE_CreateBoard(OriginalBoard);
        FIREBASE_CreateBoardList(NewBoardListItem);
        setTimeout(() => {
          store.dispatch(SetBoardList([NewBoardListItem]));
          store.dispatch(SetSelectedBoard(NewBoardListItem.BoardId));
          store.dispatch(SetBoard(OriginalBoard));
          setOpen(false);
        }, 1000);
        setTimeout(() => {
          store.dispatch(SetBoardList([NewBoardListItem]));
          store.dispatch(SetSelectedBoard(NewBoardListItem.BoardId));
          store.dispatch(SetBoard(OriginalBoard));
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
