import { ColumnType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";
import { DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

export const DefaultBoardColumns = [
  { ColumnTitle: "Column 1", ColumnColor: "green" },
  { ColumnTitle: "Column 2", ColumnColor: "slate" },
];

export const HandleColumnTitle = (Value: string, Index: number, Setter: any, BoardColumns: any) => {
  const Current = BoardColumns.map((Item: any) => ({ ...Item }));
  Current[Index].ColumnTitle = Value;
  Setter(Current);
};

export const HandleColumnColor = (Value: string, Index: number, Setter: any, BoardColumns: any) => {
  const Current = BoardColumns.map((Item: any) => ({ ...Item }));
  Current[Index].ColumnColor = Value;
  Setter(Current);
};

export const HandleDeleteColumn = (Index: number, Setter: any, BoardColumns: any) => {
  const Current = BoardColumns.map((Item: any) => ({ ...Item }));
  Current.splice(Index, 1);
  Setter(Current);
};

export const HandleAddColumn = (Setter: any, BoardColumns: any) => {
  const Current = BoardColumns.map((Item: any) => ({ ...Item }));
  var NewColum = {
    ColumnTitle: `Column ${Current.length + 1}`,
    ColumnColor: "slate",
    ColumId: v4(),
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
    Visible: true,
    CardsQtd: 0,
    Cards: [],
  };
  Current.push(NewColum);
  Setter(Current);
};

export const HandleEditBoard = (BoardName: string, BoardColumns: any[], BoardDesc: string, setMessage: (message: string) => void, Board: any) => {
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

  const NewColumns = BoardColumns.map((Column: ColumnType) => {
    return {
      ...Column,
      LastEditedAt: moment().valueOf(),
    };
  });

  const NewBoard = {
    ...Board,
    BoardName: BoardName,
    BoardColumnsQtd: BoardColumns.length,
    Description: BoardDesc || "",
    LastEditedAt: moment().valueOf(),
    Columns: [...NewColumns],
  };

  console.log("EDITED BOARD", NewBoard);

  MIDDLEWARE_UpdateBoard(NewBoard);
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

  console.log(Result, moveObjectInArray(Columns, SourceIndex, DestinationIndex));
};
