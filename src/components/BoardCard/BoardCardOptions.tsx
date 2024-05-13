import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { PopOverList } from "../PopOverList/PopOverList";
import DeleteCard from "./DeleteCard";
import DuplicateCard from "./DuplicateCard";
import SelectCard from "./SelectCard";
import { CardType, ColumnType } from "@/Data/Types";

type Props = {
  Card: CardType;
  CardIndex: number;
  ColumnIndex: number;
  Column: ColumnType;
};

export default function BoardCardOptions({ Card, CardIndex, ColumnIndex, Column }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button className="hidden px-1 py-1 size-8 h-auto rounded-md group-hover:flex items-center justify-center group-hover:absolute right-1 top-1 z-20 " variant="ghost" size="icon">
          <EllipsisVertical
            className="size-5 "
            onClick={(event) => {
              event.stopPropagation();
              setOpen(true);
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-background  dark:bg-background-dark dark:border-border-dark select-none overflow-hidden" alignOffset={0} side="right" sideOffset={100}>
        <PopOverList className="flex flex-col justify-start items-start py-2 gap-0" onClick={(event) => event.stopPropagation()}>
          <SelectCard Column={Column} CardIndex={CardIndex} ColumnIndex={ColumnIndex} Card={Card} />
          <DuplicateCard CardIndex={CardIndex} ColumnIndex={ColumnIndex} />
          <DeleteCard CardIndex={CardIndex} ColumnIndex={ColumnIndex} />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
