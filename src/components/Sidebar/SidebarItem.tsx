import { FIREBASE_GetUser } from "@/Config/Firebase/Firestore";
import { Columns3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "../Tooltip/Tooltip";
import { BoardListItemType } from "@/Data/Types";

type Props = {
  Active: boolean;
  Text: string;
  HandleSelectBoard: (BoardId: string) => void;
  BoardId: string;
  BoardListItem: BoardListItemType;
};

const SidebarItem = ({ Active, Text = "", HandleSelectBoard, BoardId, BoardListItem }: Props) => {
  const Board = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);
  const [TooltipMessage, setTooltipMessage] = useState(BoardListItem.BoardName);

  useEffect(() => {
    if (BoardListItem?.IsBoardShared) {
      FIREBASE_GetUser(Board?.OwnerUid).then((UsersFound) => {
        setTooltipMessage(Translations.Text.SharedBy + " " + UsersFound[0]?.Email);
      });
    }
  }, [BoardListItem, Board]);

  if (Active) {
    return (
      <Tooltip text={TooltipMessage}>
        <div className="flex flex-row justify-start items-center gap-2 text-sm  w-full px-3 py-2  rounded-md text-foreground  cursor-pointer hover:bg-primary hover:text-primary-foreground" onClick={() => HandleSelectBoard(BoardId)}>
          <Columns3 className="size-5 flex-shrink-0" />
          <span className="truncate text-sm">{Text}</span>
        </div>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip text={TooltipMessage}>
        <div className="flex flex-row justify-start items-center gap-2  w-full px-3 py-2 bg-primary rounded-md text-primary-foreground  cursor-pointer" onClick={() => HandleSelectBoard(BoardId)}>
          <Columns3 className="size-5  flex-shrink-0 text-sm" />
          <span className=" truncate text-sm">{Text}</span>
        </div>
      </Tooltip>
    );
  }
};

export default SidebarItem;
