import { ExampleBoard, ExampleBoardID } from "./ExampleBoard";
import { BoardListItemType } from "./Types";

export const DefaultBoardList: BoardListItemType[] = [
  {
    BoardName: ExampleBoard.BoardName || "Example Board",
    BoardId: ExampleBoardID,
    OwnerUid: "",
    docID: "",
    LastEditedAt: 2,
    IsBoardShared: false,
    BoardListGroupId: "",
    Collaborators: [],
  },
];
