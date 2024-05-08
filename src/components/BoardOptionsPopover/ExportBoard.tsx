import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Share } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";

import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";
import ExportCSV from "./ExportBoardToCsv";
import ExcelExportComponent from "./ExportBoardToExcel";

type Props = {
  SetExternalOpen: (state: boolean) => void;
};

export default function ExportBoard({ SetExternalOpen }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ListOption>
          <Share className="size-4" />
          {Translations.PopoverTitle.Export}
        </ListOption>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 bg-background  flex flex-col items-stretch justify-start dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="flex flex-col items-stretch gap-0">
          <ListOption className="flex flex-row justify-center items-stretch mb-2 cursor-default hover:bg-transparent">
            <span>{Translations.PopoverTitle.ExportFormats}</span>
          </ListOption>
          <ExportCSV SetExternalOpen={SetExternalOpen} />
          <ExcelExportComponent />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
