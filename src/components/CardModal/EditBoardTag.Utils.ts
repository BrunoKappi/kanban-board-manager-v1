import store from "@/Config/Store/Store";
import { BoardType, TagType } from "@/Data/Types";
import { MIDDLEWARE_UpdateBoard } from "@/Middleware/Board";
import { v4 } from "uuid";
import { HandleCardTagToggle } from "./TagInput.Utils";
import { STORE_GET } from "@/Middleware/Store";

export const HandleChangeBoardTagColor = (Tag: TagType, NewTagColor: string) => {
  if (!NewTagColor) return;
  var NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Tags.map((BoardTag: TagType) => {
    if (BoardTag.TagId === Tag.TagId) {
      BoardTag.TagColor = NewTagColor;
    }
  });

  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleChangeBoardTagName = (Tag: TagType, NewTagName: string) => {
  if (!NewTagName) return;
  var NewBoard: BoardType = STORE_GET("Board");

  NewBoard.Tags.map((BoardTag: TagType) => {
    if (BoardTag.TagId === Tag.TagId) {
      BoardTag.TagName = NewTagName;
    }
  });

  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleAddBoardTag = () => {
  var NewBoard: BoardType = STORE_GET("Board");

  const NewTag: TagType = {
    TagId: v4(),
    TagName: STORE_GET("Translations").Mocks.Tag,
    TagColor: "green",
  };

  NewBoard.Tags.push(NewTag);

  MIDDLEWARE_UpdateBoard(NewBoard);
};

export const HandleAddBoardTagWithValue = (Value: string, setTagSearch: any, setOpen: any) => {
  var NewBoard: BoardType = STORE_GET("Board");

  const NewTag: TagType = {
    TagId: v4(),
    TagName: Value,
    TagColor: "slate",
  };

  NewBoard.Tags.push(NewTag);

  MIDDLEWARE_UpdateBoard(NewBoard);
  setTagSearch("");
  setOpen(false);
  HandleCardTagToggle(NewTag);
};
