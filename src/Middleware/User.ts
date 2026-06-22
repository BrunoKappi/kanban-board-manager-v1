import { dbCreateBoard, dbCreateBoardList, dbCreateUser, dbGetAllUsers, dbGetUser, dbGetUserByEmail, dbUpdateUser } from "@/services/db";
import { MIDDLEWARE_CreateUserPreferences, MIDDLEWARE_GetUserPreferences, MIDDLEWARE_UpdateUserPreferences } from "./UserPreferences";
import moment from "moment";
import { BoardListItemType, UserPrefenceType } from "@/Data/Types";
import { DefaultNewUserPreference } from "@/Config/Store/UserPreferences/UserPreferences";
import { STORE_GET, STORE_ResetCardModal, STORE_SetUserPreferences } from "./Store";
import { getKeysWithSubstring } from "@/components/ManageAccount/Register.Utils";
import { ExampleBoard } from "@/Data/ExampleBoard";
import { DefaultBoardList } from "@/Data/BoardList";
import { v4 } from "uuid";
import { MIDDLEWARE_GetBoardList } from "./BoardList";
import { LOCALSTORAGE_GetItem } from "./LocalStorage";
import { UserType } from "@/Config/Store/User/User";

export const MIDDLEWARE_GetUserByEmail = async (Email: string) => {
  return dbGetUserByEmail(Email);
};

export const MIDDLEWARE_GetUser = async (Uid: string) => {
  return dbGetUser(Uid);
};

export const MIDDLEWARE_GetAllUsers = async () => {
  return dbGetAllUsers();
};

export const MIDDLEWARE_CreateUser = (User: any) => {
  return dbCreateUser(User);
};

export const MIDDLEWARE_UpdateUser = (User: any) => {
  return dbUpdateUser(User);
};

export const MIDDLEWARE_CheckUserOnLogin = async (Uid: string, Email: string) => {
  if (!Uid || !Email) return;

  const Users = await dbGetUser(Uid);

  MIDDLEWARE_GetUserPreferences(Uid);

  if (Users.length !== 0) return; //SE O USUARIO AINDA NÂO SE REGISTROU

  const User: UserType = STORE_GET("User");

  const NewUser: UserType = {
    uid: Uid,
    Email: Email,
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
    docID: "",
    displayName: User.displayName || "",
    photoURL: User.photoURL || "",
    loading: false,
  };

  const NewUserPreference: UserPrefenceType = {
    ...DefaultNewUserPreference,
    uid: Uid,
    Theme: STORE_GET("Theme"),
    CardWidth: STORE_GET("CardWidth"),
    Language: STORE_GET("Language"),
  };

  await MIDDLEWARE_CreateUser(NewUser);
  const UserPrefenceDoc = await MIDDLEWARE_CreateUserPreferences(NewUserPreference);

  const UpdatedUserPreference = {
    ...NewUserPreference,
    Uid: UserPrefenceDoc.id,
  };

  STORE_SetUserPreferences(UpdatedUserPreference);
  MIDDLEWARE_UpdateUserPreferences(UpdatedUserPreference);

  MIDDLEWARE_SyncCurrentUserWork(Uid);
};

export const MIDDLEWARE_SyncCurrentUserWork = async (Uid: string) => {
  if (!Uid) return;

  STORE_ResetCardModal();

  const UserUid = Uid;
  const Now = moment().valueOf();

  if (LOCALSTORAGE_GetItem(`Kanban-BoardList`)) {
    const LocalStorageBoardList = getKeysWithSubstring("Kanban-BoardListItem-");

    LocalStorageBoardList.map((LocalBoardListString: string) => {
      var BoardListItem = { ...JSON.parse(LOCALSTORAGE_GetItem(LocalBoardListString) || "") };
      var NewId = v4();

      var NewBoardListItem: BoardListItemType = {
        ...BoardListItem,
        LastEditedAt: Now,
        OwnerUid: UserUid,
        BoardId: NewId,
      };

      dbCreateBoardList(NewBoardListItem);

      if (LOCALSTORAGE_GetItem(`Kanban-Board-${BoardListItem.BoardId}`)) {
        var NewBoard = { ...(JSON.parse(LOCALSTORAGE_GetItem(`Kanban-Board-${BoardListItem.BoardId}`) || "") || { ...ExampleBoard }), LastEditedAt: Now, OwnerUid: UserUid, BoardId: NewId };
        dbCreateBoard(NewBoard);
      }
    });
  } else {
    var NewId = v4();

    var NewBoardListItem: BoardListItemType = {
      ...DefaultBoardList[0],
      LastEditedAt: Now,
      OwnerUid: UserUid,
      BoardId: NewId,
    };

    var NewBoard = {
      ...ExampleBoard,
      LastEditedAt: Now,
      OwnerUid: UserUid,
      BoardId: NewId,
    };

    dbCreateBoard(NewBoard);
    dbCreateBoardList(NewBoardListItem);
  }
  MIDDLEWARE_GetBoardList();
};
