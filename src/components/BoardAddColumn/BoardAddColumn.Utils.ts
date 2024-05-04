import store from "@/Config/Store/Store";
import { ColumnType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";
import { v4 } from "uuid";

export const AddColumn = () => {
  const NewBoard: any = { ...store.getState().Board };

  var NewColumns = [...NewBoard.Columns];
  var NewBoardList: any = [...store.getState().BoardList];

  NewBoardList = [...NewBoardList].map((BoardListItem: any) => {
    var NewBoardListItem = { ...BoardListItem };

    if (NewBoardListItem.BoardId === NewBoard.BoardId) {
      NewBoardListItem.LastEditedAt = moment().valueOf();
    }

    return NewBoardListItem;
  });

  const NewColum: ColumnType = {
    ColumId: v4(),
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    Visible: true,
    CardsQtd: 0,
    Cards: [],
    ColumnTitle: store.getState().Translations.Mocks.Column + " " + (NewColumns.length + 1),
    ColumnColor: "slate",
  };

  NewColumns.push(NewColum);

  NewBoard.Columns = [...NewColumns];
  NewBoard.LastEditedAt = moment().valueOf();

  MIDDLEWARE_UpdateBoard(NewBoard);
};
