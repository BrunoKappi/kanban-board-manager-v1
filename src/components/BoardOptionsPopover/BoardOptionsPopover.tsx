import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";
import DeleteBoard from "./DeleteBoard";
import { BoardModal } from "../BoardModal/BoardModal";
import Tooltip from "../Tooltip/Tooltip";
import { ListOption } from "../ListOption/ListOption";
import DuplicateBoard from "./DuplicateBoard";
import ColumnSizePopover from "../ColumnSizePopover/ColumnSizePopover";

type Props = {};

export default function BoardOptionsPopover({}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-row items-center  flex-shrink-0 gap-2 justify-center cursor-pointer select-none hover:bg-overlay hover:text-accent-foreground dark:hover:bg-overlay-dark dark:hover:text-primary-foreground px-3 py-2 rounded-xl">
          <Tooltip text="Board Options">
            <EllipsisVertical className=" size-6  dark:text-accent text-accent-foreground" />
          </Tooltip>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 bg-background  flex flex-col items-stretch justify-start dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="flex flex-col items-stretch">
          <ListOption className="flex flex-row justify-center items-stretch mb-2 cursor-default hover:bg-transparent">
            <span>Board Options</span>
          </ListOption>
          <ColumnSizePopover Mode="List" />
          <BoardModal SetExternalOpen={setOpen} />
          <DuplicateBoard SetExternalOpen={setOpen} />
          <DeleteBoard SetExternalOpen={setOpen} />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
