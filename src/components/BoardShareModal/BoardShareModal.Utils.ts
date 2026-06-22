import { dbSetListeningBoard, dbStopListeningBoard } from "@/services/db";
import { BoardListItemType, BoardType, CollaboratorType } from "@/Data/Types";
import { MIDDLEWARE_CreateBoardListItem, MIDDLEWARE_DeleteBoardListItem, MIDDLEWARE_GetBoardListItem, MIDDLEWARE_UpdateBoardListItem } from "@/Middleware/BoardList";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import moment from "moment";
import { MIDDLEWARE_GetUserByEmail } from "@/Middleware/User";
import { STORE_GET } from "@/Middleware/Store";
import { UserType } from "@/Config/Store/User/User";

//@ts-ignore
export const ChangeBoardSharingOptions = (ShareBoard: boolean, AllowEdit: boolean, AllowDuplicate: boolean, Collaborators: string[]) => {
  var NewBoard = STORE_GET("Board");

  NewBoard.Public = ShareBoard;
  NewBoard.PuclicEdit = AllowEdit;
  NewBoard.AllowDuplicate = AllowDuplicate;
  NewBoard.LastEditedAt = moment().valueOf();
  NewBoard.PublicURL = ShareBoard ? `https://kanban.bkappi.com/view/${NewBoard.BoardId}` : "";

  MIDDLEWARE_UpdateBoard(NewBoard);

  if (AllowEdit) {
    dbSetListeningBoard(NewBoard.docID);
  } else {
    if (NewBoard.Collaborators.length > 0) {
      dbSetListeningBoard(NewBoard.docID);
    } else {
      dbStopListeningBoard();
    }
  }
};

export const AddCollaborator = async (Email: string, setCollabMessage: (message: string) => void, setCollaboratorEmail: (message: string) => void) => {
  var NewBoard: BoardType = STORE_GET("Board");
  var CurrentUser: UserType = STORE_GET("User");

  if (CurrentUser?.Email === Email) {
    setCollaboratorEmail("");
    setCollabMessage("");
    return;
  }

  const User: UserType | null = await MIDDLEWARE_GetUserByEmail(Email);
  // //NEW WAY
  // const OriginalBoardListItem: BoardListItemType = await MIDDLEWARE_GetBoardListItem(NewBoard.OwnerUid, NewBoard.BoardId);

  if (!User?.Email || !User?.uid) {
    setCollaboratorEmail("");
    setCollabMessage(STORE_GET("Translations").Sharing.UserNotFound);
    setTimeout(() => {
      setCollabMessage("");
    }, 1500);
    return;
  }

  const NewCollaborator: CollaboratorType = {
    Email: User.Email,
    Uid: User.uid,
  };

  const NewBoardListItem: BoardListItemType = {
    BoardName: NewBoard.BoardName,
    BoardId: NewBoard.BoardId,
    OwnerUid: User.uid,
    docID: "",
    LastEditedAt: moment().valueOf(),
    IsBoardShared: true,
    BoardListGroupId: "",
    Collaborators: [],
  };

  const UserInCollaborators = NewBoard.Collaborators.find((UserCollab: any) => UserCollab.Uid === User.uid);
  // //NEW WAY
  // const UserInCollaboratorsNew = OriginalBoardListItem.Collaborators.find((UserCollab: any) => UserCollab.Uid === User.Uid);

  if (UserInCollaborators) {
    setCollaboratorEmail("");
    setCollabMessage(STORE_GET("Translations").Sharing.Already);
    setTimeout(() => {
      setCollabMessage("");
    }, 1500);
    return;
  }

  // //NEW WAY
  // if (UserInCollaboratorsNew) {
  //   setCollaboratorEmail("");
  //   setCollabMessage(STORE_GET("Translations").Sharing.Already);
  //   setTimeout(() => {
  //     setCollabMessage("");
  //   }, 1500);
  //   return;
  // }

  NewBoard.Collaborators.push(NewCollaborator);
  // //NEW WAY
  // OriginalBoardListItem.Collaborators.push(NewCollaborator);

  MIDDLEWARE_UpdateBoard(NewBoard);
  MIDDLEWARE_CreateBoardListItem(NewBoardListItem);

  if (NewBoard.Collaborators.length === 0) {
    dbStopListeningBoard();
  } else {
    if (NewBoard.PuclicEdit) {
      dbSetListeningBoard(NewBoard.docID);
    } else {
      if (NewBoard.Collaborators.length > 0) {
        dbSetListeningBoard(NewBoard.docID);
      } else {
        dbStopListeningBoard();
      }
    }
  }

  setCollabMessage(STORE_GET("Translations").Sharing.Added);
  setTimeout(() => {
    setCollabMessage("");
    setCollaboratorEmail("");
  }, 1500);

  // //NEW WAY
  // MIDDLEWARE_UpdateBoardListItem(OriginalBoardListItem);
};

export const RemoveCollaborator = async (Collab: any) => {
  var NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Collaborators = NewBoard.Collaborators.filter((Col: any) => Col.Uid !== Collab.Uid);

  const BoardListItem = await MIDDLEWARE_GetBoardListItem(Collab.Uid, NewBoard.BoardId);

  //NEW WAY
  var OriginalBoardListItem = await MIDDLEWARE_GetBoardListItem(NewBoard.OwnerUid, NewBoard.BoardId);

  if (OriginalBoardListItem) {
    OriginalBoardListItem.Collaborators = OriginalBoardListItem.Collaborators.filter((UserCollab: CollaboratorType) => UserCollab.Uid !== Collab.Uid);
    MIDDLEWARE_UpdateBoardListItem(OriginalBoardListItem);
  }

  MIDDLEWARE_DeleteBoardListItem(BoardListItem);
  MIDDLEWARE_UpdateBoard(NewBoard);
};
