import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList, FIREBASE_DeleteBoard, FIREBASE_GetBoard, FIREBASE_GetBoardListByBoardId, FIREBASE_GetPublicBoard, FIREBASE_UpdateBoard } from "@/Config/Firebase/Firestore";
import { UserType } from "@/Config/Store/User/User";
import { BoardListItemType, BoardType, ColumnType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import moment from "moment";
import { STORE_DeleteBoard, STORE_GET, STORE_SetLoadingBoard, STORE_UpdateBoard } from "./Store";
import { MIDDLEWARE_DeleteBoardListItem, MIDDLEWARE_UpdateBoardListItem } from "./BoardList";
import { ExampleBoard } from "@/Data/ExampleBoard";
import { LOCALSTORAGE_GetItem } from "./LocalStorage";

export const MIDDLEWARE_CreateBoard = async (BoardParam: any, setOpen: (open: boolean) => void) => {
  const Now = moment().valueOf();
  const BoardList: BoardListItemType[] = STORE_GET("BoardList");
  const User: UserType = STORE_GET("User");
  const NewBoard: BoardType = Copy(BoardParam);
  NewBoard.LastEditedAt = Now;

  const NewBoardListItem: BoardListItemType = {
    BoardName: NewBoard.BoardName,
    BoardId: NewBoard.BoardId,
    OwnerUid: NewBoard.OwnerUid,
    docID: "",
    LastEditedAt: moment().valueOf(),
    IsBoardShared: false,
    BoardListGroupId: "",
    Collaborators: [],
  };

  if (User?.uid) {
    //LOGGED USER
    const BoardData = await FIREBASE_CreateBoard(NewBoard);
    NewBoard.docID = BoardData.id;
    const BoardListItemData = await FIREBASE_CreateBoardList(NewBoardListItem);
    NewBoardListItem.docID = BoardListItemData.id;
    STORE_UpdateBoard(BoardList, NewBoardListItem, NewBoard);
  } else {
    //NOT LOGGED

    STORE_UpdateBoard(BoardList, NewBoardListItem, NewBoard);
  }

  setOpen(false);
};

export const MIDDLEWARE_UpdateBoard = (BoardParam: any) => {
  const { User, CanEditBoard, IsBoardOwner, BoardList } = STORE_GET();

  const NewBoard: BoardType = Copy(BoardParam);
  const NewBoardList: BoardListItemType[] = Copy(BoardList);
  var IsOneOfTheOwners = false;

  NewBoard.Collaborators.forEach((Collab: any) => {
    if (Collab.Uid === User?.uid) {
      IsOneOfTheOwners = true;
    }
  });

  NewBoard.LastEditedAt = moment().valueOf();

  NewBoard.Columns.map((Coluna: ColumnType) => (Coluna.CardsQtd = Coluna.Cards.length)); //UPDATE COLUMN QTD CARDS

  NewBoardList.map((Item) => {
    if (Item.BoardId === NewBoard.BoardId) {
      Item.LastEditedAt = NewBoard.LastEditedAt;
      Item.BoardName = NewBoard.BoardName;
    }
  });

  const NewBoardListItem: BoardListItemType = Copy(BoardList.find((Item: BoardListItemType) => Item.BoardId === NewBoard.BoardId));

  if (NewBoardListItem) {
    NewBoardListItem.LastEditedAt = NewBoard.LastEditedAt;
    NewBoardListItem.BoardName = NewBoard.BoardName;
    NewBoardListItem.BoardId = NewBoard.BoardId;
  }

  STORE_UpdateBoard(NewBoardList, NewBoardListItem, NewBoard);

  if ((User?.uid && CanEditBoard) || IsBoardOwner || IsOneOfTheOwners) {
    FIREBASE_UpdateBoard(NewBoard);
    MIDDLEWARE_UpdateBoardListItem(NewBoardListItem);
  }
};

export const MIDDLEWARE_DeleteBoard = async (Board: any) => {
  const UserUid: string = STORE_GET("User")?.uid;
  const BoardList: BoardListItemType[] = STORE_GET("BoardList");
  var NewBoardList: BoardListItemType[] = STORE_GET("BoardList");
  const NewBoard: BoardType = Copy(Board);

  const BoardListItem: BoardListItemType = Copy(BoardList.find((Item) => Item.BoardId === Board.BoardId));

  NewBoardList = NewBoardList.filter((Item) => Item.BoardId !== Board.BoardId);

  if (BoardListItem?.IsBoardShared === true) {
    //IF ITS SHARED
    NewBoard.Collaborators = NewBoard.Collaborators.filter((Collab: any) => Collab.Uid !== UserUid);
    MIDDLEWARE_UpdateBoard(NewBoard);
  } else {
    //IF IS THE OWNER
    const BoardListItemsOfTheBoard = await FIREBASE_GetBoardListByBoardId(NewBoard.BoardId);

    BoardListItemsOfTheBoard.forEach((Item) => {
      MIDDLEWARE_DeleteBoardListItem(Item);
    });
  }

  if (UserUid && BoardListItem) {
    if (BoardListItem.IsBoardShared === false) {
      FIREBASE_DeleteBoard(Board);
    }

    MIDDLEWARE_DeleteBoardListItem(BoardListItem);
  }

  STORE_DeleteBoard(NewBoardList, NewBoard);
};

export const MIDDLEWARE_GetBoard = async (BoardId: string) => {
  const { User } = STORE_GET();

  STORE_SetLoadingBoard(true);

  if (User.uid) {
    //USUSARIO LOGADO
    const Board = await FIREBASE_GetBoard(User.uid, BoardId);
    return Board;
  } else {
    //USUSARIO DESLOGADO
    if (LOCALSTORAGE_GetItem(`Kanban-Board-${BoardId}`)) {
      //IF THERE IS A BOARD ON LOCALSTORAGE
      return JSON.parse(LOCALSTORAGE_GetItem(`Kanban-Board-${BoardId}`) || "");
    } else {
      //IF THERE IS NOT A BOARD ON LOCALSTORAGE
      return ExampleBoard;
    }
  }
};

export const MIDDLEWARE_GetPublicBoard = async (BoardId: string) => {
  const User: UserType = STORE_GET("User");
  const Translations = STORE_GET("Translations");
  const Board: any = await FIREBASE_GetPublicBoard(BoardId);

  var Error = "";

  if (!!Board?.BoardId) {
    const UserInCollaborators = Board.Collaborators.find((user: any) => user.Uid === User.uid);

    if (Board.Public || UserInCollaborators?.Uid) {
      return { Error, Board };
    } else {
      Error = Translations.Text.BoardAccessDenied;
      return { Error, ErrorCode: "BoardAccessDenied" };
    }
  } else {
    Error = Translations.Text.BoardNotFound;
    return { Error, ErrorCode: "BoardNotFound" };
  }
};
