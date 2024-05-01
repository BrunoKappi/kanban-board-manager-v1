import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LogIn } from "lucide-react";
import { useState } from "react";
import Login from "./Login";
import Show from "@/lib/Show";
import Forgot from "./Fogot";
import Register from "./Register";
import { ListOption } from "../ListOption/ListOption";

export function ManageAccount() {
  const [Mode, setMode] = useState("Login");
  const [open, setOpen] = useState(false);

  const GetTitle = () => {
    if (Mode === "Login") return "Login";
    if (Mode === "Forgot") return "Reset Password";
    if (Mode === "Create") return "Create Account";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <ListOption>
          <LogIn className="size-5" />
          <span>Login</span>
        </ListOption>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[550px] bg-background dark:bg-card-foreground border dark:border-border-dark p-10">
        <DialogHeader className="mb-8 flex flex-col gap-3">
          <DialogTitle className="dark:text-accent text-accent-foreground text-xl font-semibold">{GetTitle()}</DialogTitle>
          <span className="dark:text-accent text-accent-foreground">Access your account to save your work</span>
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
