import { X } from "lucide-react";

import Tooltip from "../Tooltip/Tooltip";
import { useSelector } from "react-redux";
import ToggleSidebar from "../ToggleSidebar/ToggleSidebar";
import { NavbarProps } from "./NavBar.Types";
import UserPopover from "../UserPopover/UserPopover";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { useState } from "react";
import { MinimalInput } from "../ui/minimalInput";
import { ChangeBoardName } from "./Navbar.Utils";
import BoardOptionsPopover from "../BoardOptionsPopover/BoardOptionsPopover";
import Show from "@/lib/Show";
import ColumnSizePopover from "../ColumnSizePopover/ColumnSizePopover";
import SearchBar from "../SearchBar/SearchBar";
import BoardListPopover from "../BoardListPopover/BoardListPopover";

import { MAX_BOARD_TITLE } from "@/Data/Limits";

const Navbar = ({ Board }: NavbarProps) => {
  const [BoardName, setBoardName] = useState(Board?.BoardName);
  const [Editing, setEditing] = useState(false);
  const Sidebar = useSelector((state: any) => state.Sidebar);
  const Translations = useSelector((state: any) => state.Translations);
  const IsBoardOwner = useSelector((state: any) => state.IsBoardOwner);

  const HandleChangeBoardName = (e: any) => {
    e.preventDefault();

    if (!BoardName) return;
    setEditing(false);
    ChangeBoardName(BoardName);
  };

  const HandleStartEditing = (e: any) => {
    e.preventDefault();
    if (IsBoardOwner) {
      setEditing(true);
      setBoardName(Board?.BoardName);
    }
  };

  const HasBorard = !!Board?.BoardId;

  return (
    <div className="min-h-14 resize-y flex-shrink-0 flex  flex-col md:flex-row items-start md:justify-between md:items-center px-5 py-5 pt-7 pl-10 gap-5 pr-10">
      <Show if={HasBorard}>
        <div className="flex flex-row gap-0 md:gap-5 items-center justify-start w-full md:w-auto bg-slate-400/10 dark:bg-slate-400/5 rounded-xl px-2 py-1">
          {Sidebar === "Closed" && <ToggleSidebar />}

          {!Editing && HasBorard && (
            <Tooltip text={Translations.Tooltips.EditBoardName}>
              <span className="dark:text-accent text-accent-foreground hidden md:flex md:min-w-72  px-5 py-2 font-medium text-xl select-none cursor-pointer  line-clamp-1 max-w-72 truncate text-ellipsis" onDoubleClick={HandleStartEditing}>
                <span className="max-w-full truncate">{Board?.BoardName}</span>
              </span>
            </Tooltip>
          )}

          {!Editing && HasBorard && <BoardListPopover />}

          {Editing && (
            <form className="flex flex-row items-center justify-start gap-2  px-5 py-2 dark:text-accent text-accent-foreground font-medium text-xl " onSubmit={HandleChangeBoardName}>
              <MinimalInput maxLength={MAX_BOARD_TITLE} className="text-xl bg-transparent dark:bg-transparent p-0 border-none m-0 h-auto" value={BoardName} onChange={(e) => setBoardName(e.target.value)} />
              <Tooltip text={Translations.Tooltips.CancelEditBoardName}>
                <X className="size-5 cursor-pointer" />
              </Tooltip>
            </form>
          )}

          <Show if={HasBorard}>
            <BoardOptionsPopover />
          </Show>
        </div>
      </Show>

      <Show if={HasBorard}>
        <SearchBar />
      </Show>

      <div className="flex flex-row gap-4 items-center md:justify-end flex-wrap  ">
        <Show if={HasBorard}>
          <ColumnSizePopover />
        </Show>
        <ToggleTheme />
        <UserPopover />
      </div>
    </div>
  );
};

export default Navbar;
