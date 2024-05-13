import { BoardType, CardType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";
import moment from "moment";
import { v4 } from "uuid";

export const HandleDuplicateCard = (ColumnIndex: number, CardIndex: number) => {
  var NewBoard: BoardType = STORE_GET("Board");

  const NewCard: CardType = {
    ...NewBoard.Columns[ColumnIndex].Cards[CardIndex],
    CardId: v4(),
    CardTitle: NewBoard.Columns[ColumnIndex].Cards[CardIndex].CardTitle + "_Copy",
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
  };

  NewBoard.Columns[ColumnIndex].Cards.push(NewCard);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
