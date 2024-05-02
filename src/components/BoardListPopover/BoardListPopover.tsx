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
import { AddBoardItem } from "./AddBoardItem";

type Props = { Board: any };

export default function BoardListPopover({ Board }: Props) {
  const BoardList = useSelector((state: any) => state.BoardList);
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
        <span className="min-w-96 justify-between dark:text-accent flex flex-row gap-2 items-center text-accent-foreground bg-slate-400/10 dark:bg-slate-400/5 rounded-full px-5 py-2 font-medium text-xl select-none cursor-pointer truncate line-clamp-1 max-w-72">
          {Board?.BoardName}
          <ChevronDownIcon />
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
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
                <span>{BoardListItem.BoardName}</span>
              </ListOption>
            );
          })}
          <AddBoardItem />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
