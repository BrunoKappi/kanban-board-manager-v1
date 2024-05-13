import { ColumnType } from "@/Data/Types";
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
  Current.push({ ColumnTitle: `${STORE_GET("Translations").Mocks.Column} ${Current.length + 1}`, ColumnColor: "slate" });
  Setter(Current);
};

export const HandleCreateBoard = (BoardName: string, BoardColumns: any[], BoardDesc: string, setMessage: (message: string) => void, setOpen: (open: boolean) => void) => {
  if (!BoardName) {
    setMessage(STORE_GET("Translations").BoardModal.ErrorTitle);
    setTimeout(() => {
      setMessage("");
    }, 3000);
    return;
  }

  if (BoardColumns.length === 0) {
    setMessage(STORE_GET("Translations").BoardModal.ErrorColumns);
    setTimeout(() => {
      setMessage("");
    }, 3000);
    return;
  }

  const UserUid = STORE_GET("User")?.uid || "";

  const NewColumns = BoardColumns.map((Column: ColumnType) => {
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

  const NewBoard = {
    BoardId: v4(),
    BoardName: BoardName,
    BoardColumnsQtd: BoardColumns.length,
    Description: BoardDesc || "",
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
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
        TagName: STORE_GET("Translations").Mocks.Tag,
        TagColor: "slate",
      },
      {
        TagId: v4(),
        TagName: STORE_GET("Translations").Mocks.Tag + " 2",
        TagColor: "red",
      },
      {
        TagId: v4(),
        TagName: STORE_GET("Translations").Mocks.Tag + " 3",
        TagColor: "blue",
      },
    ],
  };

  MIDDLEWARE_CreateBoard(NewBoard, setOpen);
};

function moveObjectInArray(arr: any, sourceIndex: number, destinationIndex: number) {
  // Faz uma cópia profunda do array original para não modificar o original
  const newArr = arr.map((obj: any) => ({ ...obj }));

  // Remove o objeto do sourceIndex
  const [removedObject] = newArr.splice(sourceIndex, 1);

  // Insere o objeto no destinationIndex
  newArr.splice(destinationIndex, 0, removedObject);

  return newArr;
}

export const HandleDragColumns = (Result: DropResult, Columns: any, setBoardColumns: (Columns: any) => void) => {
  if (!Result.destination) return;

  const DestinationIndex = Result.destination.index;
  const SourceIndex = Result.source.index;
  const NewColumns = moveObjectInArray(Columns, SourceIndex, DestinationIndex);

  setBoardColumns(NewColumns);
};
