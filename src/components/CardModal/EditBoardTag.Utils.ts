import store from "@/Config/Store/Store";
import { TagType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/SetData";
import { v4 } from "uuid";

export const HandleChangeBoardTagColor = (Tag: TagType, NewTagColor: string) => {
  if (!NewTagColor) return;
  var NewBoard: any = { ...store.getState().Board };

  var NewBoardTags = [...NewBoard.Tags];

  NewBoardTags = [...NewBoardTags].map((BoardTag: TagType) => {
    if (BoardTag.TagId === Tag.TagId) {
      return { ...BoardTag, TagColor: NewTagColor };
    } else {
      return { ...BoardTag };
    }
  });

  NewBoard.Tags = [...NewBoardTags];

  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeBoardTagName = (Tag: TagType, NewTagName: string) => {
  if (!NewTagName) return;
  var NewBoard: any = { ...store.getState().Board };

  var NewBoardTags = [...NewBoard.Tags];

  NewBoardTags = [...NewBoardTags].map((BoardTag: TagType) => {
    if (BoardTag.TagId === Tag.TagId) {
      return { ...BoardTag, TagName: NewTagName };
    } else {
      return { ...BoardTag };
    }
  });

  NewBoard.Tags = [...NewBoardTags];

  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleAddBoardTag = () => {
  var NewBoard: any = { ...store.getState().Board };

  const NewTag: TagType = {
    TagId: v4(),
    TagName: "My Tag",
    TagColor: "green",
  };

  var NewBoardTags = [...(NewBoard.Tags || []), NewTag];

  NewBoard.Tags = [...NewBoardTags];

  MIDDLEWARE_UpdateBoard(NewBoard);
};
