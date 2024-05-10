import { BoardType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import { DropResult } from "react-beautiful-dnd";

export const HandleDrag = (Resultado: DropResult, Board: any) => {
  if (!Resultado.destination || !Resultado.source) return;

  var NewBoard: BoardType = Copy(Board);

  const SourceColumnId = Resultado.source.droppableId;
  const DestinationColumnId = Resultado.destination.droppableId;
  const DestinationIndex = Resultado.destination.index || 0;
  const SourceIndex = Resultado.source.index || 0;

  let SourceColumn = Copy(NewBoard.Columns.find((Column) => Column.ColumId === SourceColumnId));
  let ItemDragged = Copy(SourceColumn.Cards.find((Card: any) => Card.CardId === Resultado.draggableId));

  NewBoard.Columns.map((Column) => {
    if (Column.ColumId === SourceColumnId) {
      Column.Cards.splice(SourceIndex, 1);
    }
    if (Column.ColumId === DestinationColumnId) {
      Column.Cards.splice(DestinationIndex, 0, ItemDragged);
    }
  });

  MIDDLEWARE_UpdateBoard(NewBoard);
};
