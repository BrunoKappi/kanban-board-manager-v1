import store from "@/Config/Store/Store";
import { BoardType, ColumnType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const ChangeColumnVisibilityFn = (Column: ColumnType, ColumnIndex: number) => {
  const NewBoard: BoardType = Copy(store.getState().Board);

  var NewColumns = [...NewBoard.Columns];

  NewColumns = [...NewColumns].map((Col: ColumnType) => {
    const NewColItem = { ...Col };

    if (NewColItem.ColumId === Column.ColumId) {
      NewColItem.Visible = !NewColItem.Visible;
    }

    return NewColItem;
  });

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
