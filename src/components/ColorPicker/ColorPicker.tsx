import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { colors } from "@/Data/Colors";

type Props = {
  onSelect: (Key: string) => void;
  color: string;
};

export default function ColorPicker({ onSelect, color }: Props) {
  const [open, setOpen] = useState(false);
  const [Color, setColor] = useState(color);

  const HandlePickColor = (Key: string) => {
    setColor(Key);
    onSelect(Key);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span onClick={(e) => e.stopPropagation()} className={`size-5 rounded-full cursor-pointer flex-shrink-0 ${colors[Color].bg}`}></span>
      </PopoverTrigger>
      <PopoverContent className="w-44  py-2 bg-background flex flex-row flex-wrap dark:bg-background-dark dark:border-border-dark select-none gap-1" onClick={(e) => e.stopPropagation()}>
        {Object.keys(colors).map((Key) => {
          return (
            <span
              className={`${colors[Key].bg} size-5 rounded-full cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                HandlePickColor(Key);
              }}
            ></span>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}
