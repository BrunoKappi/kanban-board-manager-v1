import { X } from "lucide-react";

import Tooltip from "../Tooltip/Tooltip";
import { useSelector } from "react-redux";
import ToggleSidebar from "../ToggleSidebar/ToggleSidebar";
import { NavbarProps } from "./NavBar.Types";
import UserPopover from "../UserPopover/UserPopover";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
import { useEffect, useState } from "react";
import { MinimalInput } from "../ui/minimalInput";
import { ChangeBoardName } from "./Navbar.Utils";
import BoardOptionsPopover from "../BoardOptionsPopover/BoardOptionsPopover";
import Show from "@/lib/Show";
import ColumnSizePopover from "../ColumnSizePopover/ColumnSizePopover";
import SearchBar from "../SearchBar/SearchBar";
import BoardListPopover from "../BoardListPopover/BoardListPopover";
import { AddBoardItem } from "../BoardListPopover/AddBoardItem";
import { MAX_BOARD_TITLE } from "@/Data/Limits";

const Navbar = ({ Board }: NavbarProps) => {
  const [BoardName, setBoardName] = useState(Board?.BoardName);
  const [Editing, setEditing] = useState(false);
  const Sidebar = useSelector((state: any) => state.Sidebar);
  const [Screen, setScreen] = useState(window.innerWidth);

  const HandleChangeBoardName = (e: any) => {
    e.preventDefault();
    if (!BoardName) return;
    setEditing(false);
    ChangeBoardName(BoardName);
  };

  const HandleStartEditing = (e: any) => {
    e.preventDefault();
    setEditing(true);
    setBoardName(Board?.BoardName);
  };

  useEffect(() => {
    const handleResize = () => setScreen(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-14 flex-wrap md:flex-row resize-y flex-shrink-0 flex flex-col items-start justify-between md:items-start md:justify-between px-5 py-5 pt-7 pl-10 gap-5 pr-10">
      <div className="flex flex-row gap-5 items-center justify-start">
        {Sidebar === "Closed" && Screen > 768 && <ToggleSidebar />}

        {!Editing && Screen > 768 && !!Board.BoardId && (
          <Tooltip text="Double click to edit Board name">
            <span className="dark:text-accent text-accent-foreground min-w-72 bg-slate-400/10 dark:bg-slate-400/5 rounded-full px-5 py-2 font-medium text-xl select-none cursor-pointer  line-clamp-1 max-w-72 truncate text-ellipsis" onDoubleClick={HandleStartEditing}>
              <span className="max-w-full truncate">{Board?.BoardName}</span>
            </span>
          </Tooltip>
        )}

        {!Editing && Screen <= 768 && !!Board.BoardId && <BoardListPopover Board={Board} />}

        {!Board.BoardId && <AddBoardItem className=" rounded-full" />}

        {Editing && (
          <form className="flex flex-row items-center justify-start gap-2 bg-slate-400/10 dark:bg-slate-400/5 rounded-full px-5 py-2 dark:text-accent text-accent-foreground font-medium text-xl " onSubmit={HandleChangeBoardName}>
            <MinimalInput maxLength={MAX_BOARD_TITLE} className="text-xl bg-transparent p-0 border-none m-0 h-auto" value={BoardName} onChange={(e) => setBoardName(e.target.value)} />
            {/* <Button type="submit" variant="ghost" size="icon" className=" flex-shrink-0" onClick={HandleChangeBoardName}>
              <Save className="size-5" />
            </Button> */}
            <Tooltip text="Cancel">
              <X className="size-5 cursor-pointer" />
            </Tooltip>
          </form>
        )}

        <Show if={!!Board?.BoardId}>
          <BoardOptionsPopover />
        </Show>
      </div>

      <Show if={!!Board?.BoardId}>
        <SearchBar />
      </Show>

      <div className="flex flex-row gap-4 items-center justify-center flex-wrap">
        <Show if={!!Board.BoardName}>
          <ColumnSizePopover />
        </Show>
        <ToggleTheme />
        <UserPopover />
      </div>
    </div>
  );
};

export default Navbar;
