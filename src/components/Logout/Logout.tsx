import { FIREBASE_Logout } from "@/Config/Firebase/Auth";
import { LogOut } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { DefaultBoardList } from "@/Data/BoardList";
import { v4 } from "uuid";
import moment from "moment";
import store from "@/Config/Store/Store";
import { SetBoardList } from "@/Config/Store/BoardList/BoardList";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import { useSelector } from "react-redux";
import { ExampleBoard1 } from "@/Data/ExampleBoard1";
import { SetUserPreferencesdocID } from "@/Config/Store/UserPreferences/UserPreferences";


type Props = {
  setOpen: (mode: boolean) => void;
};

export default function Logout({ setOpen }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const handleLogout = () => {
    const CurrentTheme = localStorage.getItem("Kanban-Theme");
    const CurrentLanguage = localStorage.getItem("Kanban-Language");

    localStorage.clear();
   

    if (CurrentTheme) localStorage.setItem("Kanban-Theme", CurrentTheme);
    if (CurrentLanguage) localStorage.setItem("Kanban-Language", CurrentLanguage);
    var NewId = v4();
    var NewBoardListItem = { ...DefaultBoardList[0], LastEditedAt: moment().valueOf(), OwnerUid: "", BoardId: NewId };
    var NewBoard = { ...ExampleBoard1, LastEditedAt: moment().valueOf(), OwnerUid: "", BoardId: NewId };

    localStorage.setItem(`Kanban-Board-${NewBoard.BoardId}`, JSON.stringify(NewBoard));
    localStorage.setItem(`Kanban-BoardListItem-${NewBoard.BoardId}`, JSON.stringify(NewBoardListItem));
    localStorage.setItem(`Kanban-BoardList`, JSON.stringify([NewBoardListItem]));

    store.dispatch(SetBoardList([NewBoardListItem]));

    //@ts-ignore
    store.dispatch(SetSelectedBoard(NewBoardListItem.BoardId));

    setTimeout(() => {
      //@ts-ignore
      store.dispatch(SetBoard(NewBoard));
    }, 1500);

    setTimeout(() => {
      //@ts-ignore
      store.dispatch(SetBoard(NewBoard));
    }, 5);

    setTimeout(() => {
      //@ts-ignore
      store.dispatch(SetBoard(NewBoard));
    }, 2000);

    FIREBASE_Logout();
    //@ts-ignore
    store.dispatch(SetUserPreferencesdocID(""));
    setOpen(false);
  };

  return (
    <ListOption className="flex flex-row items-center gap-2 justify-start cursor-pointer " onClick={handleLogout}>
      <LogOut className="size-5" />
      <span>{Translations.OptionsLists.Logout}</span>
    </ListOption>
  );
}
