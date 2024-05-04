import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { CircleUserRound } from "lucide-react";
import { ManageAccount } from "../ManageAccount/ManageAccount";
import getEmailPrefix from "@/lib/utils";
import Show from "@/lib/Show";
import { useState } from "react";
import Logout from "../Logout/Logout";
import { PopOverList } from "../PopOverList/PopOverList";

type Props = {};

export default function UserPopover({}: Props) {
  const User = useSelector((state: any) => state.User);
  const [open, setOpen] = useState(false);

  const GetName = () => {
    if (User?.displayName && User?.displayName !== "Guest") return User?.displayName;
    else if (User?.uid) return getEmailPrefix(User?.email);
    else return "Guest";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-row items-center gap-2 justify-center cursor-pointer select-none hover:bg-overlay hover:text-accent-foreground dark:hover:bg-overlay-dark dark:hover:text-primary-foreground px-3 py-2 rounded-full">
          {!User?.photoURL && <CircleUserRound className="size-6"/>}
          {!!User?.photoURL && <img src={User?.photoURL} alt="User Photo" className="size-6 rounded-full" />}
          

          {GetName()}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList>
          <Show if={!User.uid}>
            <ManageAccount />
          </Show>
          <Show if={User.uid}>
            <Logout setOpen={setOpen} />
          </Show>
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
