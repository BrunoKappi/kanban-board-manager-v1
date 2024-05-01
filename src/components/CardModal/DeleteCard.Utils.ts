import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleDeleteCard = () => {
  const ColumIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumIndex] };
  var NewCards: any = [...NewColumn.Cards];

  NewCards.splice(CardIndex, 1);

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard)
};
