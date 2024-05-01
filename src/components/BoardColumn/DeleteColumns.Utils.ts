import store from "@/Config/Store/Store";
import { ColumnType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const DeleteColumnFn = (Column: ColumnType) => {
  const NewBoard: any = { ...store.getState().Board };

  var NewColumns = [...NewBoard.Columns];

  NewColumns = [...NewColumns].filter((Col: ColumnType) => Col.ColumId !== Column.ColumId);

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
