import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleToggleTask = (Index: number, Tasks: any, CardIndex: number) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;

  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };
  const Current = Tasks.map((task: any) => ({ ...task }));
  Current[Index].Completed = !Current[Index].Completed;

  NewCard.Tasks = [...Current];

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
