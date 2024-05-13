import { BoardType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const HandleDeleteCard = () => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards.splice(CardIndex, 1);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
