import { ExampleBoard1, ExampleBoardID } from "./ExampleBoard1";
import { BoardListItemType } from "./Types";

export const DefaultBoardList: BoardListItemType[] = [
  {
    BoardName: ExampleBoard1.BoardName || "Example Board",
    BoardId: ExampleBoardID,
    OwnerUid: "",
    docID: "",
    LastEditedAt: 2,
    IsBoardShared: false,
  },
];
