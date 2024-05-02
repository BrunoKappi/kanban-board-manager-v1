import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Filter } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";
import Tooltip from "../Tooltip/Tooltip";
import { ListOption } from "../ListOption/ListOption";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TagType } from "@/Data/Types";
import { colors } from "@/Data/Colors";
import { SetTagsFilter } from "@/Config/Store/TagsFilter/TagsFilter";

type Props = {};

export default function TagsFilter({}: Props) {
  const [open, setOpen] = useState(false);
  const Board = useSelector((state: any) => state.Board);
  const TagsToFilter = useSelector((state: any) => state.TagsFilter);

  const dispatch = useDispatch();

  const HandleToggleTagFilter = (Tag: string) => {
    var NewTagsToFilter = [...TagsToFilter];
    const HasTag = NewTagsToFilter.indexOf(Tag) !== -1;
    if (HasTag) {
      NewTagsToFilter.splice(NewTagsToFilter.indexOf(Tag), 1);
    } else {
      NewTagsToFilter.push(Tag);
    }
    //@ts-ignore
    dispatch(SetTagsFilter(NewTagsToFilter));
    //localStorage.setItem("Kanban-TagsFilter", JSON.stringify(NewTagsToFilter) );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Tooltip text="Filter Boards Tags">
          <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
            <Filter />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="gap-0 py-0">
          <ListOption className="flex flex-row justify-center mb-2 cursor-default hover:bg-transparent">
            <span>Filter Tags</span>
          </ListOption>

          {Board?.Tags?.map((Tag: TagType) => {
            const HasTag = TagsToFilter.indexOf(Tag.TagId) !== -1;
            return (
              <ListOption className="m-0 py-1" onClick={() => HandleToggleTagFilter(Tag?.TagId)}>
                <Check className={`size-5 ${HasTag ? " opacity-100" : " opacity-0"}`} />
                <span className={`${colors[Tag?.TagColor]?.bg} ${colors[Tag?.TagColor]?.text} cursor-pointer max-w-36 text-xs px-2 rounded-sm truncate flex-shrink-0 flex flex-row gap-1 items-center`}>{Tag?.TagName}</span>
              </ListOption>
            );
          })}
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
