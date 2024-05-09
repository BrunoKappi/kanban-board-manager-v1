import store from "@/Config/Store/Store";
import { BoardType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleDeleteCard = (ColumnIndex: number, CardIndex: number, Column: any) => {
  var NewBoard: BoardType = Copy(store.getState().Board);

  NewBoard.Columns[ColumnIndex].Cards.splice(CardIndex, 1);
  // var NewColumns: any = [...NewBoard.Columns];

  // var NewColumnIndex = ColumnIndex;

  // NewColumns?.forEach((element: any, index: number) => {
  //   if (element.ColumId === Column.ColumId) NewColumnIndex = index;
  // });

  // var NewColumn: any = { ...NewBoard.Columns[NewColumnIndex] };
  // var NewCards: any = [...NewColumn.Cards];

  // NewCards.splice(CardIndex, 1);

  // NewColumn.Cards = [...NewCards];

  // NewColumns[NewColumnIndex] = { ...NewColumn };

  // NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
