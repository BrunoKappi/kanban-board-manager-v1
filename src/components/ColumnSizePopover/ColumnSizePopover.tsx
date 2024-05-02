import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Columns2 } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";
import Tooltip from "../Tooltip/Tooltip";
import { ListOption } from "../ListOption/ListOption";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { SetCardWidth } from "@/Config/Store/CardWidth/CardWidth";
import { useSelector } from "react-redux";

type Props = {};

export default function ColumnSizePopover({}: Props) {
  const [open, setOpen] = useState(false);
  const CardWidth = useSelector((state: any) => state.CardWidth);

  const dispatch = useDispatch();

  const HandleSetCardWidth = (Width: string) => {
    localStorage.setItem("Kanban-CardWidth", Width);
    dispatch(SetCardWidth(Width));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Tooltip text="Card width">
          <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
            <Columns2 />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="gap-0 py-0">
          <ListOption className="flex flex-row justify-center mb-2 cursor-default hover:bg-transparent">
            <span>Card Width</span>
          </ListOption>
          <ListOption onClick={() => HandleSetCardWidth("w-56")}>
            <Check className={`size-5 ${CardWidth === "w-56" ? " opacity-100" : " opacity-0"}`} />
            Small
          </ListOption>
          <ListOption onClick={() => HandleSetCardWidth("w-64")}>
            <Check className={`size-5 ${CardWidth === "w-64" ? " opacity-100" : " opacity-0"}`} />
            Medium
          </ListOption>
          <ListOption onClick={() => HandleSetCardWidth("w-72")}>
            <Check className={`size-5 ${CardWidth === "w-72" ? " opacity-100" : " opacity-0"}`} />
            Large
          </ListOption>
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
