import { BoardType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import moment from "moment";
import { DropResult } from "react-beautiful-dnd";

//HANDLE DRAG
export const HandleDrag = (Resultado: DropResult, Board: any) => {
  if (!Resultado.destination) {
    return;
  }

  var NewBoard: BoardType = { ...Board };

  const Source = Resultado.source.droppableId; //ColumnId
  const Destination = Resultado.destination?.droppableId; //ColumnId
  const DestinationIndex = Resultado.destination?.index || 0;

  let NewColumns = [...Board.Columns];
  let SourceColumn = { ...NewColumns.find((Column) => Column.ColumId === Source) };
  let ItemDragged = { ...SourceColumn.Cards.find((Card: any) => Card.CardId === Resultado.draggableId) };
  let DestinationColumn = { ...NewColumns.find((Column) => Column.ColumId === Destination) };

  if (Resultado.destination.droppableId !== Resultado.source.droppableId) {
    SourceColumn.Cards = SourceColumn.Cards.filter((Card: any) => Card.CardId !== Resultado.draggableId);
    SourceColumn.CardsQtd = SourceColumn.Cards.length;
    SourceColumn.LastEditedAt = moment().valueOf();

    const NewColumnCards = [...DestinationColumn.Cards];

    NewColumnCards.splice(DestinationIndex, 0, ItemDragged);

    DestinationColumn.Cards = [...NewColumnCards];
    DestinationColumn.CardsQtd = DestinationColumn.Cards.length;
    DestinationColumn.LastEditedAt = moment().valueOf();

    NewColumns = NewColumns.map((Column: any) => {
      if (Column.ColumId === Source) {
        Column = { ...SourceColumn };
      } else if (Column.ColumId === Destination) {
        Column = { ...DestinationColumn };
      }

      return Column;
    });
  } else {
    SourceColumn.Cards = SourceColumn.Cards.filter((Card: any) => Card.CardId !== Resultado.draggableId);
    SourceColumn.LastEditedAt = moment().valueOf();

    const NewColumnCards = [...SourceColumn.Cards];

    NewColumnCards.splice(DestinationIndex, 0, ItemDragged);

    DestinationColumn.Cards = [...NewColumnCards];
    DestinationColumn.LastEditedAt = moment().valueOf();

    NewColumns = NewColumns.map((Column: any) => {
      if (Column.ColumId === Destination) {
        Column = { ...DestinationColumn };
      }

      return Column;
    });
  }

  NewBoard.LastEditedAt = moment().valueOf();
  NewBoard.BoardId = Board.BoardId;
  NewBoard.Columns = [...NewColumns];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
