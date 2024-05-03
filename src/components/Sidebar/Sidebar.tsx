import { useSelector } from "react-redux";
import ToggleSidebar from "../ToggleSidebar/ToggleSidebar";
import { useDispatch } from "react-redux";
import { SetSelectedBoard } from "@/Config/Store/SelectedBoard/SelectedBoard";
import { useEffect } from "react";
import { OrderBoards } from "./SidebarUtils";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import { AddBoardItem } from "./AddBoardItem";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";

export default function Sidebar() {
  const BoardList = useSelector((state: any) => state.BoardList);
  const SelectedBoard = useSelector((state: any) => state.SelectedBoard);

  const dispatch = useDispatch();

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
  };

  return (
    <div className="hidden md:flex w-full h-full  flex-col items-center pt-8 px-5 pl-0 gap-8 relative bg-slate-400/10 dark:bg-slate-400/5">
      <div className="w-full flex flex-row items-center justify-start gap-5 cursor-pointer  ml-7 flex-wrap mr-4">
        <ToggleSidebar />
        <Logo />
      </div>

      <div className="w-full ml-7 truncate">
        <span className="truncate">All Boards ({BoardList?.length})</span>
      </div>

      <div className=" flex flex-col gap-2  w-full ">
        {[...BoardList].sort(OrderBoards).map((Board: any) => {
          return <SidebarItem Active={SelectedBoard !== Board?.BoardId} BoardId={Board?.BoardId} Text={Board?.BoardName} HandleSelectBoard={HandleSelectBoard} />;
        })}

        <AddBoardItem />
      </div>
    </div>
  );
}
