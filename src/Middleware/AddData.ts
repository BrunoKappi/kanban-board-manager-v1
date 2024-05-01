import { FIREBASE_CreateBoard, FIREBASE_CreateBoardList } from "@/Config/Firebase/Firestore";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import store from "@/Config/Store/Store";

export const MIDDLEWARE_AddBoard = (BoardParam: any, setOpen: (open: boolean) => void) => {
  const NewBoard = { ...BoardParam };
  const UserUid = store.getState().User?.uid || "";
  const BoardList = store.getState().BoardList || [];

  const NewBoardListItem = {
    BoardName: NewBoard.BoardName,
    BoardId: NewBoard.BoardId,
    OwnerUid: NewBoard.OwnerUid,
    docID: "",
    LastEditedAt: NewBoard.LastEditedAt,
  };

  if (UserUid) {
    FIREBASE_CreateBoard(NewBoard)
      .then((Data) => {
        NewBoard.docID = Data.id;
        FIREBASE_CreateBoardList(NewBoardListItem).then((Data) => {
          NewBoardListItem.docID = Data.id;
          store.dispatch(SetBoardList([...BoardList, NewBoardListItem]));
          store.dispatch(SetSelectedBoard(NewBoardListItem.BoardId));
          store.dispatch(SetBoard(NewBoard));
          setOpen(false);
        });
      })
      .finally(() => {});
  } else {
    store.dispatch(SetBoardList([...BoardList, NewBoardListItem]));
    store.dispatch(SetSelectedBoard(NewBoardListItem.BoardId));
    store.dispatch(SetBoard(NewBoard));
    localStorage.setItem(`Kanban-Board-${NewBoard.BoardId}`, JSON.stringify(NewBoard));
    localStorage.setItem(`Kanban-BoardListItem-${NewBoard.BoardId}`, JSON.stringify(NewBoardListItem));
    localStorage.setItem(`Kanban-BoardList`, JSON.stringify([...BoardList, NewBoardListItem]));
    setOpen(false);
  }
};
