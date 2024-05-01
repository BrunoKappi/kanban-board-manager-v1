import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { MinimalInput } from "../ui/minimalInput";
import { PopOverList } from "../PopOverList/PopOverList";
import { useSelector } from "react-redux";
import { TagType } from "@/Data/Types";
import { colors } from "@/Data/Colors";
import EditBoardTag from "./EditBoardTag";
import DeleteBoardTag from "./DeleteBoardTag";
import { HandleCardTagToggle } from "./TagInput.Utils";
import { HandleAddBoardTag } from "./EditBoardTag.Utils";
import { Check } from "lucide-react";
import Tooltip from "../Tooltip/Tooltip";

type Props = {};

export default function TagInput({}: Props) {
  const CardModal = useSelector((state: any) => state.CardModal);
  const Board = useSelector((state: any) => state.Board);
  const [open, setOpen] = useState(false);
  const [TagSearch, setTagSearch] = useState("");

  const OnSearchChange = (e: any) => {
    setOpen(true);
    setTagSearch(e.target.value);
  };

  const FilterTags = (BorardTag: TagType) => {
    const HasTag = CardModal?.Card?.Tags?.indexOf(BorardTag.TagId) !== -1;
    if (!TagSearch) return !HasTag || true;
    else {
      return BorardTag?.TagName.toLowerCase().includes(TagSearch.toLowerCase()) && !HasTag;
    }
  };

  const HandleTagClick = (BorardTag: TagType) => {
    HandleCardTagToggle(BorardTag);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <span className=" text-xs hover:text-sm">+ Edit Tags</span>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 bg-background   dark:bg-background-dark-dialog dark:border-border-dark select-none overflow-hidden">
        <MinimalInput placeholder="Search Tag" className="text-xs py-1  px-0  w-full text-center h-auto " autoFocus={true} onChange={OnSearchChange} value={TagSearch} />
        <PopOverList className="flex flex-col justify-start items-start py-2 gap-0 dark:bg-background-dark-dialog " onClick={(event) => event.stopPropagation()}>
          <div className="flex flex-col gap-2 px-2 w-full">
            {Board?.Tags?.filter(FilterTags).map((BorardTag: TagType) => {
              const HasTag = CardModal.Card.Tags?.indexOf(BorardTag.TagId) !== -1 && CardModal.Card.Tags?.length > 0;
              return (
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="flex flex-row justify-start items-center gap-2 flex-shrink-0">
                    <Check className={`size-3 flex-shrink-0 ${HasTag ? " opacity-100" : " opacity-0"}`} />
                    <Tooltip text={`${HasTag ? "Remove Tag" : "Add Tag"}`}>
                      <span className={`${colors[BorardTag?.TagColor]?.bg} ${colors[BorardTag?.TagColor]?.text} cursor-pointer max-w-36 text-xs px-2 rounded-sm truncate flex-shrink-0 flex flex-row gap-1 items-center`} onClick={() => HandleTagClick(BorardTag)}>
                        <span className=" flex-shrink truncate">{BorardTag?.TagName}</span>
                      </span>
                    </Tooltip>
                  </span>
                  <div className="flex flex-row items-center justify-end gap-2">
                    <DeleteBoardTag Tag={BorardTag} />
                    <EditBoardTag Tag={BorardTag} />
                  </div>
                </div>
              );
            })}
            <span className="mt-2 w-full text-center text-xs cursor-pointer" onClick={HandleAddBoardTag}>
              + New Tag
            </span>
          </div>
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
