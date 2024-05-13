import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";
import { OrderBoards } from "../Sidebar/SidebarUtils";
import { ListOption } from "../ListOption/ListOption";
import { AddBoardItem } from "../Sidebar/AddBoardItem";
import BoardListItem from "./BoardListItem";
import { STORE_SetCardModalCard, STORE_SetSelectedBoard } from "@/Middleware/Store";

type Props = {};

export default function BoardListPopover({}: Props) {
  const BoardList = useSelector((state: any) => state.BoardList);
  const Board = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);
  const [open, setOpen] = useState(false);

  const HandleSelectBoard = (BoardId: string) => {
    STORE_SetSelectedBoard(BoardId);
    STORE_SetCardModalCard({});
  };

  const FilterMyBoardList = (BoardListItem: any) => {
    if (BoardListItem.IsBoardShared) {
      return false;
    } else {
      return true;
    }
  };

  const FilterBoardsSharedWithMe = (BoardListItem: any) => {
    if (BoardListItem.IsBoardShared) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="xl:hidden xl:max-w-72 w-full xl:min-w-96 truncate flex flex-row justify-between items-center gap-2  rounded-full px-5 py-2 cursor-pointer">
          <span className="dark:text-accent flex flex-row flex-grow gap-2 items-start justify-start text-accent-foreground  font-medium text-xl select-none cursor-pointer line-clamp-1 truncate">{Board?.BoardName}</span>
          <ChevronDownIcon className="flex-shrink-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent align="center" className=" xl:w-72 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList>
          <ListOption className="flex flex-row justify-center cursor-default hover:bg-transparent">
            <span className=" font-medium text-lg">{Translations.Sidebar.AllBoards}</span>
          </ListOption>
          {[...BoardList]
            .sort(OrderBoards)
            .filter(FilterMyBoardList)
            .map((BoardListItemObje: any) => {
              return <BoardListItem BoardListItem={BoardListItemObje} setOpen={setOpen} HandleSelectBoard={HandleSelectBoard} />;
            })}
          <AddBoardItem className="rounded-none" />
          {[...BoardList].sort(OrderBoards).filter(FilterBoardsSharedWithMe).length > 0 && (
            <ListOption className="flex flex-row justify-center cursor-default hover:bg-transparent">
              <span className=" font-medium text-lg">{Translations.Sidebar.SharedWithMe}</span>
            </ListOption>
          )}
          {[...BoardList]
            .sort(OrderBoards)
            .filter(FilterBoardsSharedWithMe)
            .map((BoardListItemObje: any) => {
              return <BoardListItem BoardListItem={BoardListItemObje} setOpen={setOpen} HandleSelectBoard={HandleSelectBoard} />;
            })}
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
