
import { UserType } from "@/Config/Store/User/User";
import { BoardType } from "@/Data/Types";
import { MIDDLEWARE_CreateBoard } from "@/Middleware/Board";
import { STORE_GET, STORE_ResetCardModal } from "@/Middleware/Store";
import { v4 } from "uuid";

export const DuplicateBoardFn = () => {
  var NewBoard: BoardType = STORE_GET("Board");
  var User: UserType = STORE_GET("User");

  NewBoard.BoardId = v4();
  NewBoard.BoardName = NewBoard.BoardName + "_Copy";
  NewBoard.OwnerUid = User.uid;

  STORE_ResetCardModal();
  MIDDLEWARE_CreateBoard(NewBoard, () => {});
};
