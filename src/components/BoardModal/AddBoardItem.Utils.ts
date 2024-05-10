import store from "@/Config/Store/Store";
import { BoardType, ColumnType } from "@/Data/Types";
import { moveObjectInArray } from "@/lib/utils";
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
    ColumnTitle: `${store.getState().Translations.Mocks.Column} ${Current.length + 1}`,
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

export const HandleEditBoard = (BoardName: string, BoardColumns: ColumnType[], BoardDesc: string, setMessage: (message: string) => void, Board: any) => {
  if (!BoardName) {
    setMessage(store.getState().Translations.BoardModal.ErrorTitle);
    setTimeout(() => {
      setMessage("");
    }, 3000);
    return;
  }

  if (BoardColumns.length === 0) {
    setMessage(store.getState().Translations.BoardModal.ErrorColumns);
    setTimeout(() => {
      setMessage("");
    }, 3000);
    return;
  }

  const NewColumns: ColumnType[] = BoardColumns.map((Column: ColumnType) => {
    return {
      ...Column,
      LastEditedAt: moment().valueOf(),
    };
  });

  const NewBoard: BoardType = {
    ...Board,
    BoardName: BoardName,
    BoardColumnsQtd: BoardColumns.length,
    Description: BoardDesc || "",
    LastEditedAt: moment().valueOf(),
    Columns: [...NewColumns],
  };

  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleDragColumns = (Result: DropResult, Columns: any, setBoardColumns: (Columns: any) => void) => {
  if (!Result.destination) return;

  const DestinationIndex = Result.destination.index;
  const SourceIndex = Result.source.index;
  const NewColumns = moveObjectInArray(Columns, SourceIndex, DestinationIndex);

  setBoardColumns(NewColumns);
};
