import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { CircleUserRound } from "lucide-react";
import { ManageAccount } from "../ManageAccount/ManageAccount";
import getEmailPrefix from "@/lib/utils";
import Show from "@/lib/Show";
import { useState } from "react";
import Logout from "../Logout/Logout";
import { PopOverList } from "../PopOverList/PopOverList";
import LanguagePopover from "../LanguagePopover/LanguagePopover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

export default function UserPopover({}: Props) {
  const User = useSelector((state: any) => state.User);
  const [open, setOpen] = useState(false);
  const Translations = useSelector((state: any) => state.Translations);

  const GetName = () => {
    if (User?.displayName && User?.displayName !== "Guest") return User?.displayName;
    else if (User?.uid) return getEmailPrefix(User?.email);
    else return Translations.Mocks.UserName;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-row items-center gap-2 justify-center cursor-pointer select-none hover:bg-overlay hover:text-accent-foreground dark:hover:bg-overlay-dark dark:hover:text-primary-foreground px-3 py-2 rounded-full truncate">
          {/* {!User?.photoURL && <CircleUserRound className="size-6" />}
          {!!User?.photoURL && <img src={User?.photoURL} alt="User Photo" className="size-6 rounded-full min-w-6 min-h-6" />} */}
          <Avatar className="size-6">
            <AvatarImage src={User?.photoURL} alt="User" />
            <AvatarFallback className="size-6 bg-transparent">
              <CircleUserRound className="size-6" />
            </AvatarFallback>
          </Avatar>

          {GetName()}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="flex flex-col items-stretch">
          <Show if={!User.uid}>
            <ManageAccount />
          </Show>
          <Show if={User.uid}>
            <Logout setOpen={setOpen} />
          </Show>
          <LanguagePopover Mode="List" />
        </PopOverList>
      </PopoverContent>
    </Popover>
  );
}
