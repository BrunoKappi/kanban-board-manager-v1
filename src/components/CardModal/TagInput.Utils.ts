import { SetCardModalCardTags } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { BoardType, TagType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleCardTagToggle = (BorardTag: TagType) => {
  const { CardModal, Board } = store.getState();

  const ColumnIndex = CardModal.ColumnIndex;
  const CardIndex = CardModal.CardIndex;

  var NewBoard: BoardType = Copy(Board);

  if (!NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags.includes(BorardTag.TagId)) {
    NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags.push(BorardTag.TagId);
  } else {
    NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags = NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags.filter((TagId: string) => TagId !== BorardTag.TagId);
  }

  //@ts-ignore
  store.dispatch(SetCardModalCardTags(NewBoard.Columns[ColumnIndex].Cards[CardIndex].Tags));

  MIDDLEWARE_UpdateBoard(NewBoard);
};
