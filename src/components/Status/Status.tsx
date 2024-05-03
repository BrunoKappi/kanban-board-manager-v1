import { colors } from "@/Data/Colors";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FormEvent, useState } from "react";
import { ColorOptions } from "../ColorPicker/Colors";
import { MinimalInput } from "../ui/minimalInput";
import { ChangeColumn } from "./Status.Utils";
import { Button } from "../ui/button";
import { MAX_COLUMN_TITLE } from "@/Data/Limits";

type StatusProps = {
  Color: string;
  Text: string;
  Column: any;
};

export default function Status({ Color = "neutral", Text = "Status", Column }: StatusProps) {
  const [open, setOpen] = useState(false);
  const [ColorChoose, setColorChoose] = useState(Color);
  const [ColumnTitle, setColumnTitle] = useState(Column.ColumnTitle);

  const HandlePickColor = (Key: string) => {
    setColorChoose(Key);
  };

  const handleChangeColumn = (e: FormEvent) => {
    e?.preventDefault();
    setOpen(false);
    if (!ColumnTitle) return;
    ChangeColumn(ColorChoose, ColumnTitle, Column); 
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className=" min-w-2 max-w-[75%]">
        <div className={`flex px-2 w-full flex-row gap-2 cursor-pointer items-center justify-center ${colors[Color.toLowerCase()].bg} px-3 py-0.5 rounded-full select-none`} onClick={() => setOpen(true)}>
          <div className={`size-3 ${colors[Color.toLowerCase()].circle} rounded-full flex-shrink-0`}></div>
          <span className={`${colors[Color.toLowerCase()].text} text-sm truncate`}>{Text}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56  py-2 bg-background flex flex-row flex-wrap dark:bg-background-dark dark:border-border-dark select-none gap-1">
        <form onSubmit={handleChangeColumn}>
          <MinimalInput maxLength={MAX_COLUMN_TITLE} value={ColumnTitle} onChange={(e) => setColumnTitle(e.target.value)} className={`p-0 px-3 py-0.5 h-auto text-sm rounded-full mb-5 mt-2 ${colors[ColorChoose.toLowerCase()].bg} ${colors[ColorChoose.toLowerCase()].text}`} />
          <div className="flex flex-row flex-wrap gap-1">
            {Object.keys(ColorOptions).map((Key) => {
              return <span className={`${ColorOptions[Key].bg} size-5 rounded-full cursor-pointer`} onClick={() => HandlePickColor(Key)}></span>;
            })}
          </div>

          <div className="flex flex-row justify-end mt-2 w-full">
            <Button className=" flex flex-row justify-end  cursor-pointer text-xs" variant="outline" size="sm" onClick={handleChangeColumn}>
              Save
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
