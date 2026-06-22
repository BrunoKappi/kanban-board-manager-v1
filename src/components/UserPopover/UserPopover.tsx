import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSelector } from "react-redux";
import { CircleHelp, CircleUserRound, User2Icon, ShieldCheck } from "lucide-react";
import { ManageAccount } from "../ManageAccount/ManageAccount";
import getEmailPrefix from "@/lib/utils";
import Show from "@/lib/Show";
import { useState } from "react";
import Logout from "../Logout/Logout";
import { PopOverList } from "../PopOverList/PopOverList";
import LanguagePopover from "../LanguagePopover/LanguagePopover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/Config/Store/User/User";
import { MyAccount } from "../ManageAccount/MyAccount";
import { ListOption } from "../ListOption/ListOption";
import LegalModal from "../Legal/LegalModal";

type UserPopoverProps = {};

export default function UserPopover({}: UserPopoverProps) {
  const User: UserType = useSelector((state: any) => state.User);
  const [open, setOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const Translations = useSelector((state: any) => state.Translations);

  const GetName = () => {
    if (User?.displayName && User?.displayName !== "Guest") return User?.displayName;
    else if (User?.uid) return getEmailPrefix(User?.Email);
    else return Translations.Mocks.UserName;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex flex-row items-center gap-2 justify-start lg:max-w-44 cursor-pointer select-none hover:bg-overlay hover:text-accent-foreground dark:hover:bg-overlay-dark dark:hover:text-primary-foreground px-3 py-2 rounded-full truncate">
          <Avatar className="size-6">
            <AvatarImage src={User?.photoURL} alt="User" />
            <AvatarFallback className="size-6 bg-transparent">
              <CircleUserRound className="size-6" />
            </AvatarFallback>
          </Avatar>
          <span className="truncate"> {GetName()}</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 mr-10 p-0 py-4 bg-background dark:bg-background-dark dark:border-border-dark select-none overflow-hidden">
        <PopOverList className="flex flex-col items-stretch">
          <ManageAccount />
          <LanguagePopover Mode="List" />
          <Show if={!!User.uid}>
            <MyAccount />
          </Show>
          <Show if={!!User.uid}>
            <Logout setOpen={setOpen} />
          </Show>
          <ListOption onClick={() => { setLegalOpen(true); setOpen(false); }} className="whitespace-nowrap">
            <ShieldCheck className="size-4 text-primary" />
            <span>{Translations.Legal?.LegalTitle || "Termos e Políticas"}</span>
          </ListOption>
        </PopOverList>
        <ListOption className="mt-2">
          <CircleHelp className="size-4" />
          <a href="https://bkappi.com/gestao-de-projetos/eficiencia-empresarial-metodologia-kanban/" target="_blank">
            {Translations.Buttons.LearnKanban}
          </a>
        </ListOption>
        <ListOption className="mt-2">
          <User2Icon className="size-4" />
          <a href="https://portfolio.bkappi.com/" target="_blank">
            {Translations.Buttons.AboutTheDev}
          </a>
        </ListOption>
      </PopoverContent>
      <LegalModal open={legalOpen} onOpenChange={setLegalOpen} />
    </Popover>
  );
}
