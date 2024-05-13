import { BoardType, ColumnType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const ChangeColumn = (ColorChoose: string, ColumnTitle: string, Column: ColumnType) => {
  const NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Columns.map((Col: ColumnType) => {
    if (Col.ColumId === Column.ColumId) {
      Col.ColumnTitle = ColumnTitle;
      Col.ColumnColor = ColorChoose;
    }
  });

  MIDDLEWARE_UpdateBoard(NewBoard);
};
