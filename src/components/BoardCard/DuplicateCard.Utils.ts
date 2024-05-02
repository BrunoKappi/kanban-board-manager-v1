import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";
import { v4 } from "uuid";

export const HandleDuplicateCard = (ColumnIndex: number, CardIndex: number, Column: any) => {
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];

  var NewColumnIndex = ColumnIndex;

  NewColumns.forEach((element: any, index: number) => {
    if (element.ColumId === Column.ColumId) NewColumnIndex = index;
  });

  var NewColumn: any = { ...NewBoard.Columns[NewColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };

  NewCard.CardId = v4();
  NewCard.CreatedAt = moment().valueOf();
  NewCard.LastEditedAt = moment().valueOf();

  NewCards.push(NewCard);

  NewColumn.Cards = [...NewCards];

  //@ts-ignore
  NewColumns[NewColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];


  MIDDLEWARE_UpdateBoard(NewBoard);
};
