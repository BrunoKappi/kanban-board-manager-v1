import { FIREBASE_CreateBoardList, FIREBASE_DeleteBoardListItem, FIREBASE_GetBoardListItem, FIREBASE_GetUserByEmail, setListeningBoard, stopListeningBoard } from "@/Config/Firebase/Firestore";
import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";

//@ts-ignore
export const ChangeBoardSharingOptions = (ShareBoard: boolean, AllowEdit: boolean, AllowDuplicate: boolean, Collaborators: string[]) => {
  var NewBoard = JSON.parse(JSON.stringify(store.getState().Board));

  NewBoard.Public = ShareBoard;
  NewBoard.PuclicEdit = AllowEdit;
  NewBoard.AllowDuplicate = AllowDuplicate;
  //NewBoard.Collaborators = [...Collaborators];
  NewBoard.LastEditedAt = moment().valueOf();
  NewBoard.PublicURL = ShareBoard ? `https://kanban.bkappi.com/view/${NewBoard.BoardId}` : "";

  MIDDLEWARE_UpdateBoard(NewBoard);

  if (AllowEdit) {
    setListeningBoard(NewBoard.docID);
  } else {
    if (NewBoard.Collaborators.length > 0) {
      setListeningBoard(NewBoard.docID);
    } else {
      stopListeningBoard();
    }
  }
};

export const AddCollaborator = async (Email: string, setCollabMessage: (message: string) => void, setCollaboratorEmail: (message: string) => void) => {
  var NewBoard: any = { ...store.getState().Board };
  var CurrentUser: any = { ...store.getState().User };

  if (CurrentUser.email === Email) {
    setCollaboratorEmail("");
    setCollabMessage("");
    return;
  }

  const User: any = await FIREBASE_GetUserByEmail(Email);

  if (!User?.Email || !User?.Uid) {
    setCollaboratorEmail("");
    setCollabMessage(store.getState().Translations.Sharing.UserNotFound);
    setTimeout(() => {
      setCollabMessage("");
    }, 1500);
    return;
  }

  const NewCollaborator = {
    Email: User.Email,
    Uid: User.Uid,
  };

  const NewBoardListItem = {
    BoardName: NewBoard.BoardName,
    BoardId: NewBoard.BoardId,
    OwnerUid: User.Uid,
    docID: "",
    LastEditedAt: moment().valueOf(),
    IsBoardShared: true,
  };

  const UserInCollaborators = NewBoard.Collaborators.find((UserCollab: any) => UserCollab.Uid === User.Uid);

  if (UserInCollaborators) {
    setCollaboratorEmail("");
    setCollabMessage(store.getState().Translations.Sharing.Already);
    setTimeout(() => {
      setCollabMessage("");
    }, 1500);
    return;
  }

  const NewCollaborators = [...NewBoard.Collaborators];

  NewCollaborators.push(NewCollaborator);

  NewBoard.Collaborators = [...NewCollaborators];

  MIDDLEWARE_UpdateBoard(NewBoard);
  FIREBASE_CreateBoardList(NewBoardListItem);
  if (NewCollaborators.length === 0) {
    stopListeningBoard();
  } else {
    if (NewBoard.AllowEdit) {
      setListeningBoard(NewBoard.docID);
    } else {
      stopListeningBoard();
    }
  }

  setCollabMessage(store.getState().Translations.Sharing.Added);
  setTimeout(() => {
    setCollabMessage("");
    setCollaboratorEmail("");
  }, 1500);
};

export const RemoveCollaborator = async (Collab: any) => {
  var NewBoard: any = JSON.parse(JSON.stringify(store.getState().Board));

  NewBoard.Collaborators = NewBoard.Collaborators.filter((Col: any) => Col.Uid !== Collab.Uid);

  const BoardListItem = await FIREBASE_GetBoardListItem(Collab.Uid, NewBoard.BoardId);

  FIREBASE_DeleteBoardListItem(BoardListItem);
  MIDDLEWARE_UpdateBoard(NewBoard);
};
