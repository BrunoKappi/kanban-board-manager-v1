import store from "@/Config/Store/Store";
import { ColumnType } from "@/Data/Types";
import { MIDDLEWARE_AddBoard } from "@/Middleware/AddData";
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
    setMessage("Board Name is empty");
    setTimeout(() => {
      setMessage("");
    }, 3000);
    return;
  }

  if (BoardColumns.length === 0) {
    setMessage("Add at least one column");
    setTimeout(() => {
      setMessage("");
    }, 3000);
    return;
  }

  const UserUid = store.getState().User?.uid || "";

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

  MIDDLEWARE_AddBoard(NewBoard, setOpen);
};

function moveObjectInArray(arr: any, sourceIndex: number, destinationIndex: number) {
  // Verifica se os índices estão dentro dos limites do array
  if (sourceIndex < 0 || sourceIndex >= arr.length || destinationIndex < 0 || destinationIndex > arr.length) {
    throw new Error("Índices estão fora dos limites do array.");
  }

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
