import { useSelector } from "react-redux";
import ToggleSidebar from "../ToggleSidebar/ToggleSidebar";
import { useDispatch } from "react-redux";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import { useEffect } from "react";
import { OrderBoards } from "./SidebarUtils";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";

import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";
import { AddBoardItem } from "../BoardListPopover/AddBoardItem";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const BoardList = useSelector((state: any) => state.BoardList);
  const SelectedBoard = useSelector((state: any) => state.SelectedBoard);
  const Translations = useSelector((state: any) => state.Translations);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!SelectedBoard) dispatch(SetSelectedBoard(BoardList.sort(OrderBoards)[0]?.BoardId));

  useEffect(() => {
    //@ts-ignore
    if (!SelectedBoard) dispatch(SetSelectedBoard(BoardList.sort(OrderBoards)[0]?.BoardId));
  }, [SelectedBoard]);

  const HandleSelectBoard = (BoardId: string) => {
    //@ts-ignore
    dispatch(SetSelectedBoard(BoardId));
    //@ts-ignore
    dispatch(SetCardModalCard({}));
    navigate("../");
  };

  return (
    <div className="hidden md:flex w-full h-full  flex-col items-center pt-8 px-5 pl-0 gap-8 relative bg-slate-400/10 dark:bg-slate-400/5">
      <div className="w-full flex flex-row items-center justify-start gap-5 cursor-pointer  ml-7 flex-wrap mr-4">
        <ToggleSidebar />
        <Logo />
      </div>

      <div className="w-full ml-7 truncate">
        <span className="truncate">
          {Translations.Sidebar.AllBoards} ({BoardList?.length})
        </span>
      </div>

      <div className=" flex flex-col gap-2  w-full ">
        {[...BoardList].sort(OrderBoards).map((Board: any) => {
          return <SidebarItem Active={SelectedBoard !== Board?.BoardId} BoardId={Board?.BoardId} Text={Board?.BoardName} HandleSelectBoard={HandleSelectBoard} />;
        })}

        <AddBoardItem className=" rounded-r-full" />
      </div>
    </div>
  );
}
