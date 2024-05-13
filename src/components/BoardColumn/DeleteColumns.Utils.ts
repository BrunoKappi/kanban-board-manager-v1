import { BoardType, ColumnType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const DeleteColumnFn = (Column: ColumnType) => {
  const NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Columns = NewBoard.Columns.filter((Col: ColumnType) => Col.ColumId !== Column.ColumId);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
