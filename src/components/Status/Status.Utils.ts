import store from "@/Config/Store/Store";
import { ColumnType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const ChangeColumn = (ColorChoose: string, ColumnTitle: string, Column: ColumnType) => {
  const NewBoard: any = { ...store.getState().Board };

  var NewColumns = [...NewBoard.Columns];

  NewColumns = [...NewColumns].map((Col: ColumnType) => {
    const NewColItem = { ...Col };

    if (NewColItem.ColumId === Column.ColumId) {
      NewColItem.ColumnTitle = ColumnTitle;
      NewColItem.ColumnColor = ColorChoose;
    }

    return NewColItem;
  });

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
