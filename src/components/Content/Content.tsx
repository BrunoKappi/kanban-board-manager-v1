import Navbar from "../Navbar/Navbar";
import { Board as BoardComponente } from "../Board/Board";
import { useSelector } from "react-redux";
import { MIDDLEWARE_GetBoard, MIDDLEWARE_GetPublicBoard } from "@/Middleware/GetData";
import { useDispatch } from "react-redux";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import { SetCanEditBoard } from "@/Config/Store/CanEditBoard/CanEditBoard";
import { SetCanDuplicateBoard } from "@/Config/Store/CanDuplicateBoard/CanDuplicateBoard";
import { SetIsBoardOwner } from "@/Config/Store/IsBoardOwner/IsBoardOwner";

export default function Content() {
  const [BoardError, setBoardError] = useState("");

  const SelectedBoard = useSelector((state: any) => state.SelectedBoard);
  const User = useSelector((state: any) => state.User);
  const Board = useSelector((state: any) => state.Board);
  const dispatch = useDispatch();
  const { BoardId } = useParams();

  useEffect(() => {
    if (!!BoardId) {
      MIDDLEWARE_GetPublicBoard(BoardId).then((Data) => {
        if (Data.Error) {
          setBoardError(Data.Error);
        } else {
          //@ts-ignore
          dispatch(SetSelectedBoard(Data?.Board.BoardId));
          dispatch(SetBoard(Data?.Board));
          //@ts-ignore
          dispatch(SetCanEditBoard(Data?.Board.PuclicEdit));
          dispatch(SetCanDuplicateBoard(Data?.Board.AllowDuplicate));

          if (Data?.Board.OwnerUid === User.uid) {
            dispatch(SetCanEditBoard(true));
            dispatch(SetIsBoardOwner(true));
          }
        }
      });
    } else {
      dispatch(SetCanEditBoard(true));
      MIDDLEWARE_GetBoard(SelectedBoard).then((Data) => {
        //@ts-ignore
        dispatch(SetBoard(Data));
        dispatch(SetCanEditBoard(true));
        dispatch(SetCanDuplicateBoard(true));
      });
    }
  }, [SelectedBoard, BoardId, User]);

  return (
    <div className="flex flex-col flex-grow h-full ">
      <Navbar Board={Board} />
      <BoardComponente Board={Board} BoardError={BoardError} />
    </div>
  );
}
