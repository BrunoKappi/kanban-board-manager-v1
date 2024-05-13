import { BoardType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const HandleDeleteCard = (ColumnIndex: number, CardIndex: number) => {
  var NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Columns[ColumnIndex].Cards.splice(CardIndex, 1);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
