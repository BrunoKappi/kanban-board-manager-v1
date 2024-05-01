import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";
import { v4 } from "uuid";

export const HandleDuplicateCard = (ColumnIndex: number, CardIndex: number) => {
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };

  NewCard.CardId = v4();
  NewCard.CreatedAt = moment().valueOf();
  NewCard.LastEditedAt = moment().valueOf();

  NewCards.push(NewCard);

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
