import { BoardType, ColumnType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const ChangeColumnVisibilityFn = (Column: ColumnType) => {
  const NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Columns.map((Col: ColumnType) => {
    if (Col.ColumId === Column.ColumId) {
      Col.Visible = !Col.Visible;
    }
  });

  MIDDLEWARE_UpdateBoard(NewBoard);
};
