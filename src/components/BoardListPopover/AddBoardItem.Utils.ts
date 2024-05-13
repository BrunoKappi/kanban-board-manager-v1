import { BoardType, ColumnType } from "@/Data/Types";
import { moveObjectInArray } from "@/lib/utils";
import { MIDDLEWARE_CreateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";
import moment from "moment";
import { DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

export const DefaultBoardColumns = [
  { ColumnTitle: "Column 1", ColumnColor: "green" },
  { ColumnTitle: "Column 2", ColumnColor: "slate" },
];

export const HandleColumnTitle = (Value: string, Index: number, Setter: any, BoardColumns: any) => {
  const Current = [...BoardColumns];
  Current[Index].ColumnTitle = Value;
  Setter(Current);
};

export const HandleColumnColor = (Value: string, Index: number, Setter: any, BoardColumns: any) => {
  const Current = [...BoardColumns];
  Current[Index].ColumnColor = Value;
  Setter(Current);
};

export const HandleDeleteColumn = (Index: number, Setter: any, BoardColumns: any) => {
  const Current = [...BoardColumns];
  Current.splice(Index, 1);
  Setter(Current);
};

export const HandleAddColumn = (Setter: any, BoardColumns: any) => {
  const Current = [...BoardColumns];
  Current.push({ ColumnTitle: `Column ${Current.length + 1}`, ColumnColor: "slate" });
  Setter(Current);
};

export const HandleCreateBoard = (BoardName: string, BoardColumns: any[], BoardDesc: string, setMessage: (message: string) => void, setOpen: (open: boolean) => void) => {
  if (!BoardName) {
    setMessage(STORE_GET("Translations").BoardModal.ErrorTitle);
    setTimeout(() => setMessage(""), 3000);
    return;
  }

  if (BoardColumns.length === 0) {
    setMessage(STORE_GET("Translations").BoardModal.ErrorColumns);
    setTimeout(() => setMessage(""), 3000);
    return;
  }

  const UserUid = STORE_GET("User")?.uid || "";

  const NewColumns: ColumnType[] = BoardColumns.map((Column: ColumnType) => {
    return {
      ColumId: v4(),
      ColumnTitle: Column.ColumnTitle,
      ColumnColor: Column.ColumnColor,
      CreatedAt: moment().valueOf(),
      LastEditedAt: moment().valueOf(),
      Visible: true,
      CardsQtd: 0,
      Cards: [],
    };
  });

  const NewBoard: BoardType = {
    BoardId: v4(),
    BoardName: BoardName,
    BoardColumnsQtd: BoardColumns.length,
    Description: BoardDesc || "",
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
    Shared: false,
    PuclicEdit: false,
    AllowDuplicate: false,
    Public: false,
    PublicURL: "",
    Collaborators: [],
    OwnerUid: UserUid,
    docID: "",
    ColorColumns: true,
    Columns: [...NewColumns],
    Tags: [
      {
        TagId: v4(),
        TagName: "My Tag",
        TagColor: "slate",
      },
      {
        TagId: v4(),
        TagName: "My Tag 2",
        TagColor: "red",
      },
      {
        TagId: v4(),
        TagName: "My Tag 3",
        TagColor: "blue",
      },
    ],
  };

  MIDDLEWARE_CreateBoard(NewBoard, setOpen);
};

export const HandleDragColumns = (Result: DropResult, Columns: any, setBoardColumns: (Columns: any) => void) => {
  if (!Result.destination) return;

  const DestinationIndex = Result.destination.index;
  const SourceIndex = Result.source.index;
  const NewColumns = moveObjectInArray(Columns, SourceIndex, DestinationIndex);

  setBoardColumns(NewColumns);
};
