import { Save } from "lucide-react";
import { Button } from "../ui/button";
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

const Navbar = ({ Board }: NavbarProps) => {
  const [BoardName, setBoardName] = useState(Board?.BoardName);
  const [Editing, setEditing] = useState(false);
  const Sidebar = useSelector((state: any) => state.Sidebar);

  const HandleChangeBoardName = () => {
    if (!BoardName) return;
    setEditing(false);
    ChangeBoardName(BoardName);
  };

  const HandleStartEditing = (e: any) => {
    e.preventDefault();
    setEditing(true);
    setBoardName(Board?.BoardName);
  };

  return (
    <div className="min-h-14  resize-y flex-shrink-0 flex flex-row items-center justify-between px-5 py-5 pt-7 pl-10 gap-5 pr-10">
      <div className="flex flex-row gap-5 items-center justify-start">
        {Sidebar === "Closed" && <ToggleSidebar />}

        {!Editing && (
          <Tooltip text="Double click to edit Board name">
            <span className=" dark:text-accent text-accent-foreground font-medium text-xl select-none cursor-pointer truncate line-clamp-1 max-w-72" onDoubleClick={HandleStartEditing}>
              {Board?.BoardName}
            </span>
          </Tooltip>
        )}

        {Editing && (
          <form className="flex flex-row items-center justify-start gap-2 dark:text-accent text-accent-foreground font-medium text-xl " onSubmit={HandleStartEditing}>
            <MinimalInput className="text-xl" value={BoardName} onChange={(e) => setBoardName(e.target.value)} />
            <Button type="submit" variant="ghost" size="icon" className=" flex-shrink-0" onClick={HandleChangeBoardName}>
              <Save className="size-5" />
            </Button>
          </form>
        )}
        <Show if={!!Board?.BoardId}>
          <BoardOptionsPopover />
        </Show>
      </div>
      <div className="flex flex-row gap-4 items-center justify-center">
        <ToggleTheme />
        <UserPopover />
      </div>
    </div>
  );
};

export default Navbar;
