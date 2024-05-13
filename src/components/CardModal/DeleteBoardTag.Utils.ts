import { BoardType, TagType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { STORE_GET } from "@/Middleware/Store";

export const HandleDeleteBoardTag = (Tag: TagType) => {
  if (!Tag.TagId) return;
  var NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Tags = NewBoard.Tags.filter((BoardTag: TagType) => BoardTag.TagId !== Tag.TagId);

  MIDDLEWARE_UpdateBoard(NewBoard);
};
