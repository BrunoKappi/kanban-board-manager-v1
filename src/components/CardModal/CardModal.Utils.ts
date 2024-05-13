import { BoardType, CardType, ColumnType, TaskType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET, STORE_SetCardModalCardTitle } from "@/Middleware/Store";
import moment from "moment";
import { DropResult } from "react-beautiful-dnd";
import { v4 } from "uuid";

export const DefaultBoardCardModals = [
  { CardModalTitle: "CardModal 1", CardModalColor: "green" },
  { CardModalTitle: "CardModal 2", CardModalColor: "slate" },
];

export const HandleToggleTask = (Index: number, Setter: any) => {
  const { CardModal, Board } = STORE_GET();
  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks[Index].Completed = !NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks[Index].Completed;

  Setter(NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks);
  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleDeleteTask = (Index: number, Setter: any) => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks.splice(Index, 1);

  Setter(NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks);
  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeTaskTitle = (Value: string, Index: number, Setter: any, Tasks: any) => {
  const Current = Tasks.map((task: any) => ({ ...task })); // Cria uma cópia profunda de cada objeto dentro do array Tasks
  Current[Index].TaskTitle = Value;
  Setter(Current);
};

export const HandleAddTask = (Setter: any, Tasks: any) => {
  const { CardModal, Board, Translations } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  var NewTask: TaskType = {
    TaskId: v4(),
    TaskTitle: `${Translations.Mocks.Task} ${Tasks.length + 1}`,
    Completed: false,
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
  };

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks.push(NewTask);

  Setter(NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks);
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

  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;

  var NewBoard: BoardType = Copy(Board);

  const DestinationIndex = Result.destination.index;
  const SourceIndex = Result.source.index;

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks = moveObjectInArray(Tasks, SourceIndex, DestinationIndex);

  setCardTasks(NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks);
  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleSaveBoard = (NewBoard: any) => {
  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeCardTitle = (Title: string) => {
  if (!Title) return;
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].CardTitle = Title;

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeShowTasksOnCard = (State: boolean) => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].ShowTasksOnCard = State;

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeStartAt = (State: number) => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].StartAt = State;

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeEndAt = (State: number) => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].EndAt = State;

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeCardNotes = (Title: string) => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].CardNotes = Title;

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const SetCardModalTitle = (Title: string) => {
  STORE_SetCardModalCardTitle(Title);
};

export const HandleChangeCardColumn = (ColumnId: string) => {
  if (!ColumnId) return;
  const ColumnIndex: number = STORE_GET("CardModal").ColumnIndex;
  const CardIndex: number = STORE_GET("CardModal").CardIndex;

  const CardMode: string = STORE_GET("CardModal").Mode;
  var NewBoard: BoardType = STORE_GET("Board");
  var NewColumns: ColumnType[] = [...NewBoard.Columns];
  var NewColumn: ColumnType = { ...NewBoard.Columns[ColumnIndex] };
  var NewCards: CardType[] = [...NewColumn.Cards];

  var NewCard: CardType = { ...NewCards[CardIndex] };

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
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].CardDescription = Desc;

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleSaveTasks = (Tasks: any) => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardIndex: number = CardModal.CardIndex;
  const CardMode: string = CardModal.Mode;
  var NewBoard: BoardType = Copy(Board);

  NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tasks = Tasks;

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleCreateCard = (CardTitle: string, CardDesc: string, Tasks: any, setOpen: (state: boolean) => void, setMessage: (message: string) => void) => {
  if (!CardTitle) {
    setMessage(STORE_GET("Translations").CardModal.ErrorTitle);
    setTimeout(() => {
      setMessage("");
      return;
    }, 3000);
    return;
  }

  const { CardModal, Board } = STORE_GET();

  const ColumnIndex: number = CardModal.ColumnIndex;
  const CardMode: string = CardModal.Mode;

  var NewBoard: BoardType = Copy(Board);

  const NewCard: CardType = {
    CardId: v4(),
    CardTitle: CardTitle,
    CardDescription: CardDesc,
    Tasks: [...Tasks],
    LastEditedAt: moment().valueOf(),
    CreatedAt: moment().valueOf(),
    Tags: [...(CardModal?.Card?.Tags || [])],
    TasksQtd: Tasks.length,
    ShowTasksOnCard: false,
    StartAt: 0,
    EndAt: 0,
    ShowDatesOnCard: false,
    CardNotes: "",
  };

  NewBoard.Columns[ColumnIndex].Cards.push(NewCard);

  if (CardMode === "View") MIDDLEWARE_UpdateBoard(NewBoard);
  if (CardMode === "Add") MIDDLEWARE_UpdateBoard(NewBoard);

  setOpen(false);
};
