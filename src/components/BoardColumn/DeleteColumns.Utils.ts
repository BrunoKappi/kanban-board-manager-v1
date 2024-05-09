import store from "@/Config/Store/Store";
import { BoardType, ColumnType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const DeleteColumnFn = (Column: ColumnType) => {
  const NewBoard: BoardType = Copy(store.getState().Board);

  NewBoard.Columns = NewBoard.Columns.filter((Col: ColumnType) => Col.ColumId !== Column.ColumId);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
