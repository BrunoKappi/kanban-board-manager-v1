import store from "@/Config/Store/Store";
import { BoardType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";
import { v4 } from "uuid";

export const HandleDuplicateCard = (ColumnIndex: number, CardIndex: number, Column: any) => {
  var NewBoard: BoardType = Copy(store.getState().Board);

  NewBoard.Columns[ColumnIndex].Cards.push({
    ...NewBoard.Columns[ColumnIndex].Cards[CardIndex],
    CardId: v4(),
    CardTitle: NewBoard.Columns[ColumnIndex].Cards[CardIndex].CardTitle + "_Copy",
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
  });

  //----------OLD-----------------//
  // var NewColumns: any = [...NewBoard.Columns];

  // var NewColumnIndex = ColumnIndex;

  // NewColumns.forEach((element: any, index: number) => {
  //   if (element.ColumId === Column.ColumId) NewColumnIndex = index;
  // });

  // var NewColumn: any = { ...NewBoard.Columns[NewColumnIndex] };
  // var NewCards: any = [...NewColumn.Cards];
  // var NewCard: any = { ...NewCards[CardIndex] };

  // NewCard.CardId = v4();
  // NewCard.CardTitle = NewCard.CardTitle + "_Copy";
  // NewCard.CreatedAt = moment().valueOf();
  // NewCard.LastEditedAt = moment().valueOf();

  // NewCards.push(NewCard);

  // NewColumn.Cards = [...NewCards];

  // //@ts-ignore
  // NewColumns[NewColumnIndex] = { ...NewColumn };

  // NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
