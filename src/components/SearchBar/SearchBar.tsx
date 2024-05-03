import { Search } from "lucide-react";
import { MinimalInput } from "../ui/minimalInput";
import TagsFilter from "../TagsFilter/TagsFilter";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetSearchFilter } from "@/Config/Store/SearchFilter/CardWidth";
import { MAX_SEARCH } from "@/Data/Limits";

type Props = {};

export default function SearchBar({}: Props) {
  const SearchFilter = useSelector((state: any) => state.SearchFilter);
  const dispatch = useDispatch();

  const HandleSearch = (Search: string) => {
    dispatch(SetSearchFilter(Search));
  };

  return (
    <div className="flex flex-row flex-grow w-full md:max-w-[30%] gap-2 items-center">
      <div className="flex flex-row min-w-72  flex-grow  gap-2 items-center  px-3   bg-slate-400/10 dark:bg-slate-400/5 rounded-full">
        <Search />
        <MinimalInput maxLength={MAX_SEARCH} value={SearchFilter} className="bg-transparent dark:bg-transparent border-none " placeholder="Search..." onChange={(e) => HandleSearch(e.target.value)} />
      </div>
      <TagsFilter />
    </div>
  );
}
