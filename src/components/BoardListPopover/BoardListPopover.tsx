import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { ChevronDownIcon, Columns3 } from "lucide-react";

import { useState } from "react";

import { PopOverList } from "../PopOverList/PopOverList";
import { OrderBoards } from "../Sidebar/SidebarUtils";
import { ListOption } from "../ListOption/ListOption";
import { useDispatch } from "react-redux";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import { AddBoardItem } from "../Sidebar/AddBoardItem";

type Props = {};

export default function BoardListPopover({}: Props) {
  const BoardList = useSelector((state: any) => state.BoardList);
  const Board = useSelector((state: any) => state.Board);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const HandleSelectBoard = (BoardId: string) => {
    //@ts-ignore
    dispatch(SetSelectedBoard(BoardId));
    //@ts-ignore
    dispatch(SetCardModalCard({}));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="md:hidden md:max-w-72 w-full md:min-w-96 truncate flex flex-row justify-between items-center gap-2  rounded-full px-5 py-2 cursor-pointer">
          <span className="dark:text-accent flex flex-row flex-grow gap-2 items-start justify-start text-accent-foreground  font-medium text-xl select-none cursor-pointer line-clamp-1 truncate">{Board?.BoardName}</span>
          <ChevronDownIcon className="flex-shrink-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="center" className=" md:w-72 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList>
          <ListOption className="flex flex-row justify-center mb-2 cursor-default hover:bg-transparent">
            <span className=" font-medium text-lg">Boards</span>
          </ListOption>
          {[...BoardList].sort(OrderBoards).map((BoardListItem: any) => {
            return (
              <ListOption
                className="flex flex-row justify-start "
                onClick={() => {
                  setOpen(false);
                  HandleSelectBoard(BoardListItem.BoardId);
                }}
              >
                <Columns3 className="size-5" />
                <span className="truncate">{BoardListItem.BoardName}</span>
              </ListOption>
            );
          })}
          <AddBoardItem
            className=" rounded-none
          "
          />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
