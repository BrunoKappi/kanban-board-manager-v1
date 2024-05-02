import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleDeleteCard = () => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];

  NewCards.splice(CardIndex, 1);

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard)
};
