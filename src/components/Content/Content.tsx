import Navbar from "../Navbar/Navbar";
import { Board as BoardComponente } from "../Board/Board";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardMessage from "./BoardMessage";
import { setListeningBoard, stopListeningBoard } from "@/Config/Firebase/Firestore";
import { MIDDLEWARE_GetBoard, MIDDLEWARE_GetPublicBoard } from "@/Middleware/Board";
import { STORE_SetBoard, STORE_SetCanDuplicateBoard, STORE_SetCanEditBoard, STORE_SetIsBoardOwner, STORE_SetSelectedBoard } from "@/Middleware/Store";

export default function Content() {
  const [BoardError, setBoardError] = useState("");
  const SelectedBoard = useSelector((state: any) => state.SelectedBoard);
  const User = useSelector((state: any) => state.User);
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

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
          STORE_SetSelectedBoard(Data?.Board.BoardId);
          STORE_SetBoard(Data?.Board);
          STORE_SetCanEditBoard(Data?.Board.PuclicEdit);
          STORE_SetCanEditBoard(Data?.Board.AllowDuplicate);

          if (Data?.Board.PuclicEdit) IsPublic = true;
          if (Data?.Board?.Collaborators.length > 0) HasCollab = true;

          if ((Data?.Board?.OwnerUid !== User.uid && !!User.uid) || IsPublic || HasCollab) {
            setListeningBoard(Data?.Board.docID);
          } else {
            stopListeningBoard();
          }

          stopListeningBoard();

          if (Data?.Board.OwnerUid === User.uid) {
            STORE_SetCanEditBoard(true);
            STORE_SetIsBoardOwner(true);
          }
        }
      });
    } else {
      if (SelectedBoard) {
        STORE_SetCanEditBoard(true);
        MIDDLEWARE_GetBoard(SelectedBoard).then((Data) => {
          STORE_SetBoard(Data);
          STORE_SetCanEditBoard(true);
          STORE_SetCanDuplicateBoard(true);

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
      <BoardMessage />
      <BoardComponente Board={Board} BoardError={BoardError} />
    </div>
  );
}
