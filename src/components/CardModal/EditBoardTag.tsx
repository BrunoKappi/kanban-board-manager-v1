import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

import { Pen } from "lucide-react";
import { MinimalInput } from "../ui/minimalInput";
import { TagType } from "@/Data/Types";
import ColorPicker from "../ColorPicker/ColorPicker";
import { HandleChangeBoardTagColor, HandleChangeBoardTagName } from "./EditBoardTag.Utils";
import { MAX_TAGNAME } from "@/Data/Limits";

type Props = {
  Tag: TagType;
};

export default function EditBoardTag({ Tag }: Props) {
  const [open, setOpen] = useState(false);
  const [NewTag, setNewTag] = useState(Tag?.TagName);

  const ChangeBoardTagColor = (NewTagColor: string) => {
    HandleChangeBoardTagColor(Tag, NewTagColor);
  };

  const ChangeBoardTagName = (e: FormDataEvent) => {
    e.preventDefault();
    HandleChangeBoardTagName(Tag, NewTag);
    if (NewTag) setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger onClick={(e) => e.stopPropagation()}>
        <Pen className="size-4 p-0.3 cursor-pointer flex-shrink-0" />
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-background py-2 px-2 max-w-56 flex flex-row gap-2 justify-start items-center dark:bg-background-dark dark:border-border-dark select-none overflow-hidden" side="right" onClick={(e) => e.stopPropagation()}>
        {/*@ts-ignore */}
        <form className="w-full" onSubmit={ChangeBoardTagName}>
          <MinimalInput maxLength={MAX_TAGNAME} placeholder="Tag name" className="text-xs py-1  px-0  w-full text-center h-auto " autoFocus={true} value={NewTag} onChange={(e) => setNewTag(e.target.value.trim())} />
        </form>
        <ColorPicker color={Tag.TagColor} onSelect={ChangeBoardTagColor} />
      </PopoverContent>
    </Popover>
  );
}
