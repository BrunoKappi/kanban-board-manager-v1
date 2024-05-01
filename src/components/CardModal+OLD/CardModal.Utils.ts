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
  const Current = Tasks.map((task: any) => ({ ...task })); // Cria uma cópia profunda de cada objeto dentro do array Tasks
  Current[Index].Completed = !Current[Index].Completed;
  Setter(Current);
};

export const HandleChangeTaskTitle = (Value: string, Index: number, Setter: any, Tasks: any) => {
  const Current = Tasks.map((task: any) => ({ ...task })); // Cria uma cópia profunda de cada objeto dentro do array Tasks
  Current[Index].TaskTitle = Value;
  Setter(Current);
};

// export const HandleCardModalTitle = (Value: string, Index: number, Setter: any, BoardCardModals: any) => {
//   const Current = [...BoardCardModals];
//   Current[Index].CardModalTitle = Value;
//   Setter(Current);
// };

// export const HandleCardModalColor = (Value: string, Index: number, Setter: any, BoardCardModals: any) => {
//   const Current = [...BoardCardModals];
//   Current[Index].CardModalColor = Value;
//   Setter(Current);
// };

// export const HandleDeleteCardModal = (Index: number, Setter: any, BoardCardModals: any) => {
//   const Current = [...BoardCardModals];
//   Current.splice(Index, 1);
//   Setter(Current);
// };

export const HandleAddTask = (Setter: any, Tasks: any) => {
  const Current = Tasks.map((task: any) => ({ ...task })); // Cria uma cópia profunda de cada objeto dentro do array Tasks
  var NewTask = {
    TaskId: v4(),
    TaskTitle: `Task ${Tasks.length + 1}`,
    Completed: false,
    CreatedAt: moment().valueOf(),
    LastEditedAt: moment().valueOf(),
  };

  Current.push(NewTask);
  Setter(Current);
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

export const HandleDragTasks = (Result: DropResult, Tasks: any, setCardTasks: (Tasks: any) => void, Column: any, ColumIndex: number, CardIndex: number, setBoard: any) => {
  if (!Result.destination) return;

  var NewBoard: any = { ...store.getState().Board };
  var NewColumns: any = [...NewBoard.Columns];
  var NewColumn: any = { ...NewBoard.Columns[ColumIndex] };
  var NewCards: any = [...NewColumn.Cards];
  var NewCard: any = { ...NewCards[CardIndex] };

  const DestinationIndex = Result.destination.index;
  const SourceIndex = Result.source.index;
  const NewTasks = moveObjectInArray(Tasks, SourceIndex, DestinationIndex);

  NewCard.Tasks = [...NewTasks];

  NewCards = NewCards.map((Card: any) => {
    var NewCardItem = { ...Card };
    if (NewCardItem.CardId === NewCard.CardId) NewCardItem.Tasks = [...NewCard.Tasks];

    return NewCardItem;
  });

  NewColumn.Cards = [...NewCards];

  NewColumns = NewColumns.map((Column: any) => {
    var NewColumnItem = { ...Column };
    if (NewColumnItem.ColumnId === NewColumn.ColumnId) NewColumnItem = { ...NewColumn };

    return NewColumnItem;
  });

  NewBoard.Columns = [...NewColumns];

  setBoard(NewBoard);
  setCardTasks(NewTasks);
};

export const HandleSaveBoard = (NewBoard: any) => {
  MIDDLEWARE_UpdateBoard(NewBoard);
};

// export const HandleEditBoard = (BoardName: string, BoardCardModals: any[], BoardDesc: string, setMessage: (message: string) => void, Board: any) => {
//   if (!BoardName) {
//     setMessage("Board Name is empty");
//     setTimeout(() => {
//       setMessage("");
//     }, 3000);
//     return;
//   }

//   if (BoardCardModals.length === 0) {
//     setMessage("Add at least one CardModal");
//     setTimeout(() => {
//       setMessage("");
//     }, 3000);
//     return;
//   }

//   const NewCardModals = BoardCardModals.map((CardModal: any) => {
//     return {
//       ...CardModal,
//       LastEditedAt: moment().valueOf(),
//     };
//   });

//   const NewBoard = {
//     ...Board,
//     BoardName: BoardName,
//     BoardCardModalsQtd: BoardCardModals.length,
//     Description: BoardDesc || "",
//     LastEditedAt: moment().valueOf(),
//     CardModals: [...NewCardModals],
//   };

//   console.log("EDITED BOARD", NewBoard);

//   MIDDLEWARE_UpdateBoard(NewBoard);
// };

// function moveObjectInArray(arr: any, sourceIndex: number, destinationIndex: number) {
//   // Verifica se os índices estão dentro dos limites do array
//   if (sourceIndex < 0 || sourceIndex >= arr.length || destinationIndex < 0 || destinationIndex > arr.length) {
//     throw new Error("Índices estão fora dos limites do array.");
//   }

//   // Faz uma cópia profunda do array original para não modificar o original
//   const newArr = arr.map((obj: any) => ({ ...obj }));

//   // Remove o objeto do sourceIndex
//   const [removedObject] = newArr.splice(sourceIndex, 1);

//   // Insere o objeto no destinationIndex
//   newArr.splice(destinationIndex, 0, removedObject);

//   return newArr;
// }

// export const HandleDragCardModals = (Result: DropResult, CardModals: any, setBoardCardModals: (CardModals: any) => void) => {
//   if (!Result.destination) return;

//   const DestinationIndex = Result.destination.index;
//   const SourceIndex = Result.source.index;
//   const NewCardModals = moveObjectInArray(CardModals, SourceIndex, DestinationIndex);

//   setBoardCardModals(NewCardModals);

//   console.log(Result, moveObjectInArray(CardModals, SourceIndex, DestinationIndex));
// };
