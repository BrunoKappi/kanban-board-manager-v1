import { BoardType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const HandleToggleTask = (Index: number, CardIndex: number, ColumnIndex: number) => {
  var NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks[Index].Completed = !NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks[Index].Completed;

  MIDDLEWARE_UpdateBoard(NewBoard);
};
