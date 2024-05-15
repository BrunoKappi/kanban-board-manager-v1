import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogIn, SquareUserRound } from "lucide-react";
import { useState } from "react";
import Login from "./Login";
import Show from "@/lib/Show";
import Forgot from "./Fogot";
import Register from "./Register";
import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";

export function ManageAccount() {
  const Translations = useSelector((state: any) => state.Translations);
  const User = useSelector((state: any) => state.User);
  const [Mode, setMode] = useState("Login");
  const [open, setOpen] = useState(false);

  const GetTitle = () => {
    if (Mode === "Login") return Translations.Login.Title;
    if (Mode === "Forgot") return Translations.Forgot.Title;
    if (Mode === "Create") return Translations.Register.Title;
  };

  const GetSubTitle = () => {
    if (Mode === "Login") return Translations.Login.Desc;
    if (Mode === "Forgot") return Translations.Forgot.Desc;
    if (Mode === "Create") return Translations.Register.Desc;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ListOption>
          {!User.uid && <LogIn className="size-5" />}
          {User.uid && <SquareUserRound className="size-5" />}
          {!User.uid && <span>{Translations.Buttons.Login}</span>}
          {User.uid && <span onClick={() => localStorage.clear()}>{Translations.Buttons.ChangeAccount}</span>}
        </ListOption>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[550px] bg-background dark:bg-card-foreground border dark:border-border-dark p-10">
        <DialogHeader className="mb-8 flex flex-col gap-3">
          <DialogTitle className="dark:text-accent text-accent-foreground text-xl font-semibold">{GetTitle()}</DialogTitle>
          <span className="dark:text-accent text-accent-foreground">{GetSubTitle()}</span>
        </DialogHeader>
        <Show if={Mode === "Login"}>
          <Login setMode={setMode} setOpen={setOpen} />
        </Show>
        <Show if={Mode === "Forgot"}>
          <Forgot setMode={setMode} setOpen={setOpen} />
        </Show>
        <Show if={Mode === "Create"}>
          <Register setMode={setMode} setOpen={setOpen} />
        </Show>
      </DialogContent>
    </Dialog>
  );
}
