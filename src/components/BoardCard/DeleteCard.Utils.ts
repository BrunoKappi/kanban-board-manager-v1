import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleDeleteCard = (ColumnIndex: number, CardIndex: number, Column: any) => {
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];

  var NewColumnIndex = ColumnIndex;

  NewColumns?.forEach((element: any, index: number) => {
    if (element.ColumId === Column.ColumId) NewColumnIndex = index;
  });

  var NewColumn: any = { ...NewBoard.Columns[NewColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];

  NewCards.splice(CardIndex, 1);

  NewColumn.Cards = [...NewCards];

  NewColumns[NewColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
