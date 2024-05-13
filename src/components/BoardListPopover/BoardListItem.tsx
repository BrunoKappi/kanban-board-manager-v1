import { Columns3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "../Tooltip/Tooltip";
import { ListOption } from "../ListOption/ListOption";
import { MIDDLEWARE_GetUser } from "@/Middleware/User";


type Props = {
  setOpen: (BoardId: boolean) => void;
  HandleSelectBoard: (BoardId: string) => void;
  BoardListItem: any;
};

const BoardListItem = ({ setOpen, HandleSelectBoard, BoardListItem }: Props) => {
  const Board = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);
  const [TooltipMessage, setTooltipMessage] = useState(BoardListItem.BoardName);

  useEffect(() => {
    if (BoardListItem.IsBoardShared) {
      MIDDLEWARE_GetUser(Board.OwnerUid).then((UsersFound) => {
        setTooltipMessage(Translations.Text.SharedBy + " " + UsersFound[0].Email);
      });
    }
  }, [BoardListItem.IsBoardShared]);

  return (
    <ListOption
      className="flex flex-row justify-start w-full"
      onClick={() => {
        setOpen(false);
        HandleSelectBoard(BoardListItem.BoardId);
      }}
    >
      <Columns3 className="size-5" />
      <Tooltip text={TooltipMessage}>
        <span className="truncate">{BoardListItem.BoardName}</span>
      </Tooltip>
    </ListOption>
  );
};

export default BoardListItem;
