import { BoardType, ColumnType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";
import moment from "moment";
import { v4 } from "uuid";

export const AddColumn = () => {
  const { Board, Translations } = STORE_GET();

  const NewBoard: BoardType = Copy(Board);

  const NewColum: ColumnType = {
    ColumId: v4(),
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    Visible: true,
    CardsQtd: 0,
    Cards: [],
    ColumnTitle: Translations.Mocks.Column + " " + (NewBoard.Columns.length + 1),
    ColumnColor: "slate",
  };

  NewBoard.Columns.push(NewColum);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
