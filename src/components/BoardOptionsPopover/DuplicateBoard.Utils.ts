import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { UserType } from "@/Config/Store/User/User";
import { BoardType } from "@/Data/Types";
import { Copy } from "@/lib/utils";
import { MIDDLEWARE_AddBoard } from "@/Middleware/AddData";
import { v4 } from "uuid";

export const DuplicateBoardFn = () => {
  var NewBoard: BoardType = Copy(store.getState().Board);
  var User: UserType = Copy(store.getState().User);

  NewBoard.BoardId = v4();
  NewBoard.BoardName = NewBoard.BoardName + "_Copy";
  NewBoard.OwnerUid = User.uid;

  //@ts-ignore
  store.dispatch(SetCardModalCard({}));
  MIDDLEWARE_AddBoard(NewBoard, () => {});
};
