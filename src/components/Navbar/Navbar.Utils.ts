import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const ChangeBoardName = (BoardName: string) => {
  const NewBoard: any = { ...store.getState().Board };

  NewBoard.BoardName = BoardName;

  MIDDLEWARE_UpdateBoard(NewBoard);
};
