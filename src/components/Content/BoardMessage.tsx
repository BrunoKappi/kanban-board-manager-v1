import { dbGetUser } from "@/services/db";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "../Tooltip/Tooltip";
import { LOCALSTORAGE_GetItem, LOCALSTORAGE_SetItem } from "@/Middleware/LocalStorage";

type BoardMessageProps = {};

export default function BoardMessage({}: BoardMessageProps) {
  const [Message, setMessage] = useState("");
  const [DismissMessage, setDismissMessage] = useState(true);
  const [MessageType, setMessageType] = useState("alert");
  const Translations = useSelector((state: any) => state.Translations);
  const User = useSelector((state: any) => state.User);
  const IsBoardOwner = useSelector((state: any) => state.IsBoardOwner);
  const CanEditBoard = useSelector((state: any) => state.CanEditBoard);
  const Board = useSelector((state: any) => state.Board);

  var IsOneOfTheOwners = false;

  Board?.Collaborators?.forEach((Collab: any) => {
    if (Collab.Uid === User?.uid) {
      IsOneOfTheOwners = true;
    }
  });

  useEffect(() => {
    if (!Board.BoardId) {
      setMessage("");
      setDismissMessage(true);
      return;
    }

    if (IsBoardOwner || User.uid === Board?.OwnerUid) {
      setMessage("");
      setDismissMessage(true);
    } else {
      const DismissLocalstorage = LOCALSTORAGE_GetItem(`Kanban-Dismiss-${Board.BoardId}`) || "NotDismiss";

      if (DismissLocalstorage === "Dismiss") {
        setDismissMessage(true);
        return;
      } else {
        if (CanEditBoard || IsOneOfTheOwners) {
          if (!User.uid) {
            setDismissMessage(false);
            setMessage(Translations.Text.NotLogged);
            setMessageType("alert");
          } else {
            dbGetUser(Board?.OwnerUid).then((UsersFound) => {
              setDismissMessage(false);
              setMessageType("info");
              //@ts-ignore
              setMessage(Translations.Text.SharedBoardMessage + " " + UsersFound?.[0]?.Email);
            });
            setDismissMessage(false);

            setMessageType("info");
          }
        } else {
          setDismissMessage(false);
          setMessage(Translations.Text.EditinNotAllowed);
          setMessageType("alert");
        }
      }
    }
  }, [IsBoardOwner, CanEditBoard, User, Board, Translations]);

  const handleDismissMessage = () => {
    LOCALSTORAGE_SetItem(`Kanban-Dismiss-${Board.BoardId}`, "Dismiss");
    setDismissMessage(true);
  };

  return (
    <div className="w-full pl-10 flex flex-row items-center">
      {Message && !DismissMessage && (
        <div className={`${MessageType === "alert" ? "bg-orange-400/30 dark:bg-orange-400/10 dark:text-orange-400 text-orange-600 " : "bg-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400 text-blue-600"}    px-2 py-0.5 rounded-full w-auto flex flex-row items-center gap-2`}>
          <span className="text-xs ">{Message}</span>

          <Tooltip text={Translations.Text.DismissSharedBoardMessage}>
            <X className="size-3 hover:bg-overlay" onClick={handleDismissMessage} />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
