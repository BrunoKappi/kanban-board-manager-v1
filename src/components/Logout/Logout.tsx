import { FIREBASE_Logout } from "@/Config/Firebase/Auth";
import { LogOut } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { DefaultBoardList } from "@/Data/BoardList";
import { v4 } from "uuid";
import moment from "moment";
import { useSelector } from "react-redux";
import { ExampleBoard } from "@/Data/ExampleBoard";
import { STORE_SetSelectedBoard, STORE_SetBoardList, STORE_SetBoard, STORE_SetUserPreferencesdocID } from "@/Middleware/Store";
import { LOCALSTORAGE_Clear, LOCALSTORAGE_GetItem, LOCALSTORAGE_SetItem } from "@/Middleware/LocalStorage";

type LogoutProps = {
  setOpen: (mode: boolean) => void;
};

export default function Logout({ setOpen }: LogoutProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const handleLogout = () => {
    const CurrentTheme = LOCALSTORAGE_GetItem("Kanban-Theme");
    const CurrentLanguage = LOCALSTORAGE_GetItem("Kanban-Language");

    LOCALSTORAGE_Clear();

    if (CurrentTheme) LOCALSTORAGE_SetItem("Kanban-Theme", CurrentTheme);
    if (CurrentLanguage) LOCALSTORAGE_SetItem("Kanban-Language", CurrentLanguage);
    var NewId = v4();
    var NewBoardListItem = { ...DefaultBoardList[0], LastEditedAt: moment().valueOf(), OwnerUid: "", BoardId: NewId };
    var NewBoard = { ...ExampleBoard, LastEditedAt: moment().valueOf(), OwnerUid: "", BoardId: NewId };

    LOCALSTORAGE_SetItem(`Kanban-Board-${NewBoard.BoardId}`, JSON.stringify(NewBoard));
    LOCALSTORAGE_SetItem(`Kanban-BoardListItem-${NewBoard.BoardId}`, JSON.stringify(NewBoardListItem));
    LOCALSTORAGE_SetItem(`Kanban-BoardList`, JSON.stringify([NewBoardListItem]));

    STORE_SetBoardList([NewBoardListItem]);

    STORE_SetSelectedBoard(NewBoardListItem.BoardId);

    setTimeout(() => STORE_SetBoard(NewBoard), 1500);

    setTimeout(() => STORE_SetBoard(NewBoard), 5);

    setTimeout(() => STORE_SetBoard(NewBoard), 2000);

    FIREBASE_Logout();

    STORE_SetUserPreferencesdocID("");
    setOpen(false);
  };

  return (
    <ListOption className="flex flex-row items-center gap-2 justify-start cursor-pointer " onClick={handleLogout}>
      <LogOut className="size-5" />
      <span>{Translations.OptionsLists.Logout}</span>
    </ListOption>
  );
}
