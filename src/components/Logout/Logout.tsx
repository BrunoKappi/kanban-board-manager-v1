import { FIREBASE_Logout } from "@/Config/Firebase/Auth";
import { LogOut } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";

type Props = {
  setOpen: (mode: boolean) => void;
};

export default function Logout({ setOpen }: Props) {
  const handleLogout = () => {
    //localStorage.clear();
    localStorage.setItem(`Kanban-BoardList`, JSON.stringify([]));
    FIREBASE_Logout();
    setOpen(false);
  };

  return (
    <ListOption className="flex flex-row items-center gap-2 justify-start cursor-pointer " onClick={handleLogout}>
      <LogOut className="size-5" />
      <span>Logout</span>
    </ListOption>
  );
}
