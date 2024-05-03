import { SetCardModalCardTitle } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";
import { DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

export const DefaultBoardCardModals = [
  { CardModalTitle: "CardModal 1", CardModalColor: "green" },
  { CardModalTitle: "CardModal 2", CardModalColor: "slate" },
];

export const HandleToggleTask = (Index: number, Setter: any, Tasks: any) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };
  const Current = Tasks.map((task: any) => ({ ...task })); // Cria uma cópia profunda de cada objeto dentro do array Tasks
  Current[Index].Completed = !Current[Index].Completed;

  NewCard.Tasks = [...Current];

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  Setter(Current);
  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleDeleteTask = (Index: number, Setter: any, Tasks: any) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  const CardMode: string = store.getState().CardModal.Mode;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };
  var NewTasks = [...Tasks];
  NewTasks.splice(Index, 1);

  const Current = [...NewTasks];

  NewCard.Tasks = [...Current];

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  Setter(Current);
  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeTaskTitle = (Value: string, Index: number, Setter: any, Tasks: any) => {
  const Current = Tasks.map((task: any) => ({ ...task })); // Cria uma cópia profunda de cada objeto dentro do array Tasks
  Current[Index].TaskTitle = Value;
  Setter(Current);
};

export const HandleAddTask = (Setter: any, Tasks: any) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  const CardMode: string = store.getState().CardModal.Mode;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };

  const Current = Tasks.map((task: any) => ({ ...task })); // Cria uma cópia profunda de cada objeto dentro do array Tasks
  var NewTask = {
    TaskId: v4(),
    TaskTitle: `Task ${Tasks.length + 1}`,
    Completed: false,
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
  };

  Current.push(NewTask);

  NewCard.Tasks = [...Current];

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  Setter(Current);
  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

function moveObjectInArray(arr: any, sourceIndex: number, destinationIndex: number) {
  if (sourceIndex < 0 || sourceIndex >= arr.length || destinationIndex < 0 || destinationIndex > arr.length) {
    throw new Error("Índices estão fora dos limites do array.");
  }

  const newArr = arr.map((obj: any) => ({ ...obj }));

  const [removedObject] = newArr.splice(sourceIndex, 1);

  newArr.splice(destinationIndex, 0, removedObject);

  return newArr;
}

export const HandleDragTasks = (Result: DropResult, Tasks: any, setCardTasks: (Tasks: any) => void) => {
  if (!Result.destination) return;

  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  var NewBoard: any = { ...store.getState().Board };
  let NewColumns: any = [...NewBoard.Columns];
  let NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  let NewCards: any = [...NewColumn.Cards];
  let NewCard: any = { ...NewCards[CardIndex] };

  const DestinationIndex = Result.destination.index;
  const SourceIndex = Result.source.index;
  const NewTasks = moveObjectInArray(Tasks, SourceIndex, DestinationIndex);

  NewCard.Tasks = [...NewTasks];

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  setCardTasks(NewTasks);
  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleSaveBoard = (NewBoard: any) => {
  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeCardTitle = (Title: string) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  const CardMode: string = store.getState().CardModal.Mode;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };

  NewCard.CardTitle = Title;

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);

  //store.dispatch(SetCardModalCardTitle(Title))
};

export const HandleChangeCardNotes = (Title: string) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  const CardMode: string = store.getState().CardModal.Mode;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };

  NewCard.CardNotes = Title;

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);

  //store.dispatch(SetCardModalCardTitle(Title))
};

export const SetCardModalTitle = (Title: string) => {
  //@ts-ignore
  store.dispatch(SetCardModalCardTitle(Title));
};

export const HandleChangeCardColumn = (ColumnId: string) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;

  const CardMode: string = store.getState().CardModal.Mode;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];

  var NewCard: any = { ...NewCards[CardIndex] };

  NewCards.splice(CardIndex, 1);

  NewColumn.Cards = [...NewCards];

  NewColumns = [...NewColumns].map((Column) => {
    if (Column.ColumId === NewColumn.ColumId) {
      return { ...NewColumn };
    } else if (Column.ColumId === ColumnId) {
      return { ...Column, Cards: [...Column.Cards, NewCard] };
    } else {
      return Column;
    }
  });

  NewBoard.Columns = [...NewColumns];

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeCardDesc = (Desc: string) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  const CardMode: string = store.getState().CardModal.Mode;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };

  NewCard.CardDescription = Desc || "";

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleSaveTasks = (Tasks: any) => {
  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardIndex: number = store.getState().CardModal.CardIndex;
  const CardMode: string = store.getState().CardModal.Mode;
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };
  const NewTasks = [...Tasks];
  NewCard.Tasks = [...NewTasks];

  NewCards = NewCards.map((Card: any) => {
    return Card.CardId !== NewCard.CardId ? { ...Card } : { ...NewCard };
  });

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleCreateCard = (CardTitle: string, CardDesc: string, Tasks: any, setOpen: (state: boolean) => void, setMessage: (message: string) => void) => {
  if (!CardTitle) {
    setMessage("Card Title is Empty");
    setTimeout(() => {
      setMessage("");
      return;
    }, 3000);
    return;
  }

  const ColumnIndex: number = store.getState().CardModal.ColumnIndex;
  const CardMode: string = store.getState().CardModal.Mode;
  //@ts-ignore
  const CurrentCardTags: string[] = [...(store.getState().CardModal?.Card?.Tags || [])];
  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = {};

  NewCard.CardId = v4();
  NewCard.CardTitle = CardTitle;
  NewCard.CardDescription = CardDesc;
  NewCard.Tasks = [...Tasks];
  NewCard.LastEditedAt = moment().valueOf();
  NewCard.CreatedAt = moment().valueOf();
  NewCard.Tags = [...CurrentCardTags];
  NewCard.TasksQtd = Tasks.length;

  NewCards.push(NewCard);

  NewColumn.Cards = [...NewCards];

  NewColumns[ColumnIndex] = { ...NewColumn };

  NewBoard.Columns = [...NewColumns];

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
  if (CardMode === "Add") MIDDLEWARE_UpdateBoard(NewBoard);

  setOpen(false);
};
