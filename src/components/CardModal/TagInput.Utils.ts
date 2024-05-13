import { BoardType, TagType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET, STORE_SetCardModalCardTags } from "@/Middleware/Store";

export const HandleCardTagToggle = (BorardTag: TagType) => {
  const { CardModal, Board } = STORE_GET();

  const ColumnIndex = CardModal.ColumnIndex;
  const CardIndex = CardModal.CardIndex;

  var NewBoard: BoardType = Copy(Board);

  if (!NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags.includes(BorardTag.TagId)) {
    NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags.push(BorardTag.TagId);
  } else {
    NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags = NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags.filter((TagId: string) => TagId !== BorardTag.TagId);
  }

  STORE_SetCardModalCardTags(NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
