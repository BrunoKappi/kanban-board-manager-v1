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
import BoardMessage from "./BoardMessage";
import { setListeningBoard, stopListeningBoard } from "@/Config/Firebase/Firestore";

export default function Content() {
  const [BoardError, setBoardError] = useState("");
  const SelectedBoard = useSelector((state: any) => state.SelectedBoard);
  const User = useSelector((state: any) => state.User);
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);
  const dispatch = useDispatch();
  const { BoardId } = useParams();

  var HasCollab = false;
  var IsPublic = false;

  

  useEffect(() => {
    HasCollab = false;
    IsPublic = false;
    stopListeningBoard();
    if (!!BoardId) {
      MIDDLEWARE_GetPublicBoard(BoardId).then((Data) => {
        if (Data.Error && Data.ErrorCode) {
          setBoardError(Translations.Text[Data.ErrorCode]);
        } else {
          //@ts-ignore
          dispatch(SetSelectedBoard(Data?.Board.BoardId));
          dispatch(SetBoard(Data?.Board));
          //@ts-ignore
          dispatch(SetCanEditBoard(Data?.Board.PuclicEdit));
          dispatch(SetCanDuplicateBoard(Data?.Board.AllowDuplicate));

          if (Data?.Board.PuclicEdit) IsPublic = true;
          if (Data?.Board?.Collaborators.length > 0) HasCollab = true;

          if ((Data?.Board?.OwnerUid !== User.uid && !!User.uid) || IsPublic || HasCollab) {
            setListeningBoard(Data?.Board.docID);
          } else {
            stopListeningBoard();
          }

          stopListeningBoard();

          if (Data?.Board.OwnerUid === User.uid) {
            dispatch(SetCanEditBoard(true));
            dispatch(SetIsBoardOwner(true));
          }
        }
      });
    } else {
      if (SelectedBoard) {
        dispatch(SetCanEditBoard(true));
        MIDDLEWARE_GetBoard(SelectedBoard).then((Data) => {
          //@ts-ignore
          dispatch(SetBoard(Data));
          dispatch(SetCanEditBoard(true));
          dispatch(SetCanDuplicateBoard(true));

          if (Data?.PuclicEdit) IsPublic = true;
          if (Data?.Collaborators?.length > 0) HasCollab = true;

          if ((Data?.OwnerUid !== User.uid && !!User.uid) || IsPublic || HasCollab) {
            setListeningBoard(Data?.docID);
          } else {
            stopListeningBoard();
          }
        });
      } else {
        stopListeningBoard();
      }
    }
  }, [SelectedBoard, BoardId, User, Translations]);

  return (
    <div className="flex flex-col flex-grow h-full ">
      <Navbar Board={Board} />
      <BoardMessage BoardId={BoardId || ""} />
      <BoardComponente Board={Board} BoardError={BoardError} />
    </div>
  );
}
