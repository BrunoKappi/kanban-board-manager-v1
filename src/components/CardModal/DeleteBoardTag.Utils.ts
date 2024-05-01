import store from "@/Config/Store/Store";
import { TagType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";

export const HandleDeleteBoardTag = (Tag: TagType) => {
  if (!Tag.TagId) return;
  var NewBoard: any = { ...store.getState().Board };

  var NewBoardTags = [...NewBoard.Tags];

  NewBoardTags = [...NewBoardTags].filter((BoardTag: TagType) => BoardTag.TagId !== Tag.TagId);

  NewBoard.Tags = [...NewBoardTags];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
