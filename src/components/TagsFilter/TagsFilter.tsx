import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Filter } from "lucide-react";
import { useState } from "react";
import { PopOverList } from "../PopOverList/PopOverList";
import Tooltip from "../Tooltip/Tooltip";
import { ListOption } from "../ListOption/ListOption";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { TagType } from "@/Data/Types";
import { colors } from "@/Data/Colors";
import { MinimalInput } from "../ui/minimalInput";
import { MAX_TAGNAME } from "@/Data/Limits";
import Show from "@/lib/Show";
import { STORE_SetTagsFilter } from "@/Middleware/Store";

type TagsFilterProps = {};

export default function TagsFilter({}: TagsFilterProps) {
  const [open, setOpen] = useState(false);
  const Board = useSelector((state: any) => state.Board);
  const [TagSearch, setTagSearch] = useState("");
  const TagsToFilter = useSelector((state: any) => state.TagsFilter);
  const Translations = useSelector((state: any) => state.Translations);

  const HandleToggleTagFilter = (Tag: string) => {
    var NewTagsToFilter = [...TagsToFilter];
    const HasTag = NewTagsToFilter.indexOf(Tag) !== -1;
    if (HasTag) {
      NewTagsToFilter.splice(NewTagsToFilter.indexOf(Tag), 1);
    } else {
      NewTagsToFilter.push(Tag);
    }

    STORE_SetTagsFilter(NewTagsToFilter);
    setTagSearch("");
  };

  const OnSearchChange = (e: any) => {
    setOpen(true);
    setTagSearch(e.target.value);
  };

  const FilterTags = (BorardTag: TagType) => {
    if (!TagSearch) return true;
    else {
      return BorardTag?.TagName.toLowerCase().includes(TagSearch.toLowerCase());
    }
  };

  const handleClearFilter = () => {
    STORE_SetTagsFilter([]);
  };

  const FilteredTags = Board?.Tags?.filter(FilterTags);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Tooltip text={Translations.Tooltips.FilterTags}>
          <Button onClick={() => setOpen(true)} variant="ghost" size="icon">
            <Filter />
          </Button>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 pt-1 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="gap-0 py-0">
          <MinimalInput maxLength={MAX_TAGNAME} placeholder={Translations.Placeholders.SearchTag} className="text-xs py-1  px-0  w-full text-center h-auto bg-r " autoFocus={true} onChange={OnSearchChange} value={TagSearch} />
          <Show if={FilteredTags?.length > 0}>
            <ListOption className="flex flex-row justify-center mb-2 cursor-default hover:bg-transparent mt-2">
              <span>{Translations.PopoversSubtitles.FilterTags}</span>
            </ListOption>
          </Show>

          {FilteredTags.map((Tag: TagType) => {
            const HasTag = TagsToFilter.indexOf(Tag.TagId) !== -1;
            return (
              <ListOption className="m-0 py-1" onClick={() => HandleToggleTagFilter(Tag?.TagId)}>
                <Check className={`size-5 ${HasTag ? " opacity-100" : " opacity-0"}`} />
                <span className={`${colors[Tag?.TagColor]?.bg} ${colors[Tag?.TagColor]?.text} cursor-pointer max-w-36 text-xs px-2 rounded-sm truncate flex-shrink-0 flex flex-row gap-1 items-center`}>{Tag?.TagName}</span>
              </ListOption>
            );
          })}

          <Show if={FilteredTags?.length === 0}>
            <ListOption className="flex flex-row justify-center mb-2 cursor-default hover:bg-transparent mt-2">
              <span>{Translations.Text.FilterTagsNofound}</span>
            </ListOption>
          </Show>

          <Show if={FilteredTags?.length > 0}>
            <div className=" w-full flex flex-row px-2 mt-2 justify-end ">
              <span className="bg-overlay dark:bg-overlay-dark px-2 py-0.5 rounded-md cursor-pointer" onClick={handleClearFilter}>
                {Translations.Buttons.ClearTagFilter}
              </span>
            </div>
          </Show>
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
