import { Columns3 } from "lucide-react";

type Props = {
  Active: boolean;
  Text: string;
  HandleSelectBoard: (BoardId: string) => void;
  BoardId: string;
};

const SidebarItem = ({ Active, Text = "", HandleSelectBoard, BoardId }: Props) => {
  if (Active) {
    return (
      <div className="flex flex-row justify-start items-center gap-2 text-sm  w-full px-3 py-2  rounded-r-3xl text-foreground  cursor-pointer hover:bg-primary hover:text-primary-foreground" onClick={() => HandleSelectBoard(BoardId)}>
        <Columns3 className="size-5 flex-shrink-0" />
        <span className="truncate text-sm">{Text}</span>
      </div>
    );
  } else {
    return (
      <div className="flex flex-row justify-start items-center gap-2  w-full px-3 py-2 bg-primary rounded-r-3xl text-primary-foreground  cursor-pointer" onClick={() => HandleSelectBoard(BoardId)}>
        <Columns3 className="size-5  flex-shrink-0 text-sm" />
        <span className=" truncate text-sm">{Text}</span>
      </div>
    );
  }
};

export default SidebarItem;
