import store from "@/Config/Store/Store";
import { BoardType, CardType, ColumnType, TaskType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleToggleTask = (Index: number, Tasks: any, CardIndex: number, ColumnIndex: number) => {
  var NewBoard: BoardType = Copy(store.getState().Board);
  // var NewColumns: ColumnType[] = Copy(NewBoard.Columns);
  // var NewColumn: ColumnType = Copy(NewBoard.Columns[ColumnIndex]);
  // var NewCards: CardType[] = Copy(NewColumn.Cards);
  // var NewCard: CardType = Copy(NewCards[CardIndex]);
  // const Current: TaskType[] = Copy(Tasks.map((task: any) => Copy(task)));

  //NEW
  NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks[Index].Completed = !NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks[Index].Completed;

  // Current[Index].Completed = !Current[Index].Completed;

  // NewCard.Tasks = Copy(Current);

  // NewCards = NewCards.map((Card: CardType) => (Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard }));

  // NewColumn.Cards = [...NewCards];

  // NewColumns[ColumnIndex] = { ...NewColumn };

  // NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
