import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import store from "@/Config/Store/Store";
import { MIDDLEWARE_AddBoard } from "@/Middleware/AddData";
import { v4 } from "uuid";

export const DuplicateBoardFn = () => {
  var NewBoard: any = { ...store.getState().Board };

  NewBoard.BoardId = v4();
  NewBoard.BoardName = NewBoard.BoardName + "_Copy";

  //@ts-ignore
  store.dispatch(SetCardModalCard({}));
  MIDDLEWARE_AddBoard(NewBoard, () => {});
};
