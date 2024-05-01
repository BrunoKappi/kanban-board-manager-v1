import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { EllipsisVertical, Pen } from "lucide-react";
import { PopOverList } from "../PopOverList/PopOverList";
import DeleteCard from "./DeleteCard";
import DuplicateCard from "./DuplicateCard";

import SelectCard from "./DeleteCard copy";

type Props = {
  Card: any;
  CardIndex: number;
  ColumIndex: number;
};

export default function BoardCardOptions({ Card, CardIndex, ColumIndex }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button className="hidden px-1 py-1 size-8 h-auto rounded-md group-hover:flex items-center justify-center group-hover:absolute right-1 top-1 z-20 " variant="ghost" size="icon">
          <EllipsisVertical
            className="size-5 dark:bg-overlay-dark"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(true);
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-background  dark:bg-background-dark dark:border-border-dark select-none overflow-hidden" alignOffset={0} side="right" sideOffset={100}>
        <PopOverList className="flex flex-col justify-start items-start py-2 gap-0" onClick={(event) => event.stopPropagation()}>
          <SelectCard CardIndex={CardIndex} ColumIndex={ColumIndex} Card={Card} />
          <DuplicateCard CardIndex={CardIndex} ColumIndex={ColumIndex} />
          <DeleteCard CardIndex={CardIndex} ColumIndex={ColumIndex} />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
