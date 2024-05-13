import { BoardType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const ChangeBoardName = (BoardName: string) => {
  const NewBoard: BoardType = STORE_GET("Board");

  NewBoard.BoardName = BoardName;

  MIDDLEWARE_UpdateBoard(NewBoard);
};
