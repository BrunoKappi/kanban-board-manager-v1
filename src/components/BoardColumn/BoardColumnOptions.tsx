import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { ColumnType } from "@/Data/Types";
import DeleteColum from "./DeleteColums";
import ChangeColumnVisibility from "./ChangeColumnVisibility";
import { PopOverList } from "../PopOverList/PopOverList";
import ColumnSizePopover from "../ColumnSizePopover/ColumnSizePopover";

type Props = {
  Column: ColumnType;
};

export default function BoardColumnOptions({ Column }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" className=" rounded-lg" variant="ghost">
          <EllipsisVertical className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-background  dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="flex flex-col justify-center items-stretch py-2 gap-0">
          <ColumnSizePopover Mode="List"/>
          <DeleteColum Column={Column} />
          <ChangeColumnVisibility Column={Column} />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
