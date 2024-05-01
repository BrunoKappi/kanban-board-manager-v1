import { Check, ChevronDown, ChevronUp,  } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommandList } from "cmdk";
import { useState } from "react";
import Show from "@/lib/Show";
import Ternary from "@/lib/Ternary";
import { ComboboxDemoProps, OptionType } from "./Select.Types";
import { v4 } from "uuid";

export function Select({ Options, NotFoundMessage = "Nenhum resultado encontrado", SearchMessage, PlaceholderMessage, onSelect, IsMulti = false, WithSearch = true }: ComboboxDemoProps) {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<OptionType[]>([]);

  const handleSelect = (option: OptionType) => {
    if (IsMulti) {
      if (selectedValues.find((op) => op.value === option.value)) {
        setSelectedValues(selectedValues.filter((val) => val.value !== option.value));
        onSelect(selectedValues.filter((val) => val.value !== option.value));
      } else {
        setSelectedValues([...selectedValues, option]);
        onSelect([...selectedValues, option]);
      }
    } else {
      setSelectedValues([option]);
      onSelect([option]);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between ">
          <p className="truncate text-ellipsis">{selectedValues.length > 0 ? selectedValues?.map((value) => Options.find((option) => option.value === value.value)?.label).join(", ") : PlaceholderMessage}</p>
          <Ternary condition={open}>
            <ChevronUp className="h-5 flex-shrink-0" />
            <ChevronDown className="h-5 flex-shrink-0" />
          </Ternary>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0" side="bottom" asChild align="start">
        <Command>
          <Show if={WithSearch}>
            <div className="flex flex-row gap-2 justify-between items-center mr-1">
              <CommandInput placeholder={SearchMessage} className=" flex-grow-1" />
            </div>
          </Show>
          <CommandEmpty>{NotFoundMessage}</CommandEmpty>

          <CommandGroup>
            {Options.map((option) => (
              <CommandList key={v4()}>
                <CommandItem key={v4()} value={option.value} onSelect={() => handleSelect(option)} className="flex flex-row gap-2 cursor-pointer bg">
                  <Check className={cn("h-4 w-4 flex-shrink-0", selectedValues.find((op) => op.value === option.value) ? "opacity-100" : "opacity-0")} />
                  <p className="truncate text-ellipsis">{option.label}</p>
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
