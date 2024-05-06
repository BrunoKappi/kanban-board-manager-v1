import { getKeysWithSubstring } from "@/components/ManageAccount/Register.Utils";
import { FIREBASE_LoginWithEmailPassword, FIREBASE_LoginWithGoogle, FIREBASE_RegisterUserEmailPassword, FIREBASE_SendEMailResetPassword } from "@/Config/Firebase/Auth";
import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList, FIREBASE_CreateUser } from "@/Config/Firebase/Firestore";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { DefaultBoardList } from "@/Data/BoardList";
import { ExampleBoard1, GetText } from "@/Data/ExampleBoard1";
import moment from "moment";
import { v4 } from "uuid";
import { MIDDLEWARE_GetUser } from "./GetData";

type MIDDLEWARE_LoginProps = {
  email: string;
  password: string;
  setOpen: (mode: boolean) => void;
  setError: (error: string) => void;
};

export const MIDDLEWARE_Login = ({ email, password, setOpen, setError }: MIDDLEWARE_LoginProps) => {
  FIREBASE_LoginWithEmailPassword(email, password)
    .then(() => {
      setOpen(false);
      //@ts-ignore
      store.dispatch(SetCardModalCard({}));
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
    .then((Data) => {
      //@ts-ignore
      store.dispatch(SetCardModalCard({}));
      setMessage("User registered successfully");
      const UserUid = Data.user.uid;

      const NewUser = {
        Uid: UserUid,
        Email: email,
        CreatedAt: moment().valueOf(),
      };

      FIREBASE_CreateUser(NewUser);

      if (localStorage.getItem(`Kanban-BoardList`)) {
        const LocalStorageBoardList = getKeysWithSubstring("Kanban-BoardListItem-");

        LocalStorageBoardList.map((LocalBoardListString: string) => {
          var BoardListItem = { ...JSON.parse(localStorage.getItem(LocalBoardListString) || "") };
          var NewId = v4();

          var NewBoardListItem = { ...BoardListItem, LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };

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
        var OriginalBoard = { ...JSON.parse(JSON.stringify(ExampleBoard1)), LastEditedAt: moment().valueOf(), OwnerUid: UserUid, BoardId: NewId };
        var NewBoard = { ...GetText(Language) };

        for (let i = 0; i < OriginalBoard.Columns.length; i++) {
          //@ts-ignore
          OriginalBoard.Columns[i].ColumnTitle = NewBoard.Columns[`Column${i + 1}`].Title;

          for (let j = 0; j < OriginalBoard.Columns[i].Cards.length; j++) {
            //@ts-ignore
            OriginalBoard.Columns[i].Cards[j].CardTitle = NewBoard.Columns[`Column${i + 1}`].Cards[`Card${j + 1}`].Title;

            for (let k = 0; k < OriginalBoard.Columns[i].Cards[j].Tasks.length; k++) {
              //@ts-ignore
              OriginalBoard.Columns[i].Cards[j].Tasks[k]?.TaskTitle = NewBoard.Columns[`Column${i + 1}`].Cards[`Card${j + 1}`].Tasks[`Task${k + 1}`];
            }
          }
        }

        OriginalBoard.BoardName = NewBoard.Board?.Name;
        OriginalBoard.Description = NewBoard.Board?.Description;

        var NewBoardListItem = {
          ...DefaultBoardList[0],
          BoardId: OriginalBoard.BoardId,
          BoardName: OriginalBoard.BoardName,
          LastEditedAt: moment().valueOf(),
          OwnerUid: UserUid,
        };

        localStorage.setItem(`Kanban-Board-${OriginalBoard.BoardId}`, JSON.stringify(OriginalBoard));
        localStorage.setItem(`Kanban-BoardListItem-${OriginalBoard.BoardId}`, JSON.stringify(NewBoardListItem));
        localStorage.setItem(`Kanban-BoardList`, JSON.stringify([NewBoardListItem]));

        FIREBASE_CreateBoard(OriginalBoard);
        FIREBASE_CreateBoardList(NewBoardListItem);
        setTimeout(() => {
          setOpen(false);
        }, 3000);
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
