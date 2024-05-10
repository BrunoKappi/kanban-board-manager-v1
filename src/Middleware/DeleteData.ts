import { OrderBoards } from "@/components/Sidebar/SidebarUtils";
import { FIREBASE_DeleteBoard, FIREBASE_DeleteBoardListItem, FIREBASE_GetBoardListByBoardId, FIREBASE_UpdateBoard } from "@/Config/Firebase/Firestore";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";
import { BoardListItemType, BoardType } from "@/Data/Types";
import { Copy } from "@/lib/utils";

export const MIDDLEWARE_DeleteBoard = async (Board: any) => {
  const UserUid: string = Copy(store.getState().User?.uid);
  const BoardList: BoardListItemType[] = Copy(store.getState().BoardList);
  var NewBoardList: BoardListItemType[] = Copy(store.getState().BoardList);
  const NewBoard: BoardType = Copy(Board);

  const BoardListItem = BoardList.find((Item) => Item.BoardId === Board.BoardId);

  NewBoardList = NewBoardList.filter((Item) => Item.BoardId !== Board.BoardId);

  if (BoardListItem?.IsBoardShared === true) {
    //SE FOR COMPARTILHADA
    NewBoard.Collaborators = NewBoard.Collaborators.filter((Collab: any) => Collab.Uid !== UserUid);
    FIREBASE_UpdateBoard(NewBoard);
  } else {
    //SE FOR O DONO DA BOARD
    const BoardListItemsOfTheBoard = await FIREBASE_GetBoardListByBoardId(NewBoard.BoardId);

    BoardListItemsOfTheBoard.forEach((Item) => {
      FIREBASE_DeleteBoardListItem(Item);
    });
  }

  if (UserUid && BoardListItem) {
    if (BoardListItem.IsBoardShared === false) {
      FIREBASE_DeleteBoard(Board);
    }

    FIREBASE_DeleteBoardListItem(BoardListItem);
  }

  store.dispatch(SetBoardList(NewBoardList));
  store.dispatch(SetSelectedBoard(NewBoardList.sort(OrderBoards)[0]?.BoardId || "NA"));
  localStorage.setItem(`Kanban-BoardList`, JSON.stringify(NewBoardList));
  localStorage.removeItem(`Kanban-Board-${Board.BoardId}`);
  localStorage.removeItem(`Kanban-BoardListItem-${Board.BoardId}`);
};
