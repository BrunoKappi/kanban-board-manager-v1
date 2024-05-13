import { useSelector } from "react-redux";
import ToggleSidebar from "../ToggleSidebar/ToggleSidebar";
import { useEffect, useState } from "react";
import { OrderBoards } from "./SidebarUtils";
import Logo from "../Logo/Logo";
import SidebarItem from "./SidebarItem";
import { AddBoardItem } from "../BoardListPopover/AddBoardItem";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { STORE_SetCardModalCard, STORE_SetLoadingBoard, STORE_SetSelectedBoard } from "@/Middleware/Store";
export default function Sidebar() {
  const [ShowMyBoards, setShowMyBoards] = useState(true);
  const [ShowSharedBoards, setShowSharedBoards] = useState(true);
  const BoardList = useSelector((state: any) => [...state.BoardList]);
  const SelectedBoard = useSelector((state: any) => state.SelectedBoard);
  const Translations = useSelector((state: any) => state.Translations);
  const LoadingSidebar = useSelector((state: any) => state.LoadingSidebar);

  const navigate = useNavigate();

  if (!SelectedBoard && BoardList.length > 0) STORE_SetSelectedBoard(BoardList?.sort(OrderBoards)[0]?.BoardId || "");

  useEffect(() => {
    if (!SelectedBoard && BoardList.length > 0) {
      STORE_SetSelectedBoard(BoardList?.sort(OrderBoards)[0]?.BoardId || "");
    }
  }, [SelectedBoard]);

  const HandleSelectBoard = (BoardId: string) => {
    //@ts-ignore
    STORE_SetSelectedBoard(BoardId);
    STORE_SetCardModalCard({});
    navigate("../");
    STORE_SetLoadingBoard(true);
  };

  const FilterMyBoardList = (BoardListItem: any) => {
    if (BoardListItem.IsBoardShared) {
      return false;
    } else {
      return true;
    }
  };

  const FilterBoardsSharedWithMe = (BoardListItem: any) => {
    if (BoardListItem.IsBoardShared) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="hidden md:flex w-full h-full  flex-col items-center justify-start pt-8 px-2  gap-0 relative  bg-slate-400/10 dark:bg-slate-400/5 overflow-y-scroll overflow-x-hidden">
      {LoadingSidebar && <LoaderCircle className=" animate-spin" />}
      {!LoadingSidebar && (
        <>
          <div className="w-full flex flex-row items-center justify-start gap-1 cursor-pointer  ml-7 flex-wrap mr-4 mb-5">
            <ToggleSidebar />
            <Logo />
          </div>

          <div className="w-full text-xs py-1 px-1 truncate mb-2 rounded-md text-center cursor-pointer select-none" onClick={() => setShowMyBoards(!ShowMyBoards)}>
            <span className="truncate w-full flex flex-row justify-between">
              {Translations.Sidebar.AllBoards} ({BoardList?.filter(FilterMyBoardList).length})
            </span>
          </div>

          <div className=" flex flex-col gap-2  w-full ">
            {ShowMyBoards && (
              <>
                {[...BoardList]
                  .filter(FilterMyBoardList)
                  .sort(OrderBoards)
                  .map((BoardListItem: any) => {
                    return <SidebarItem BoardListItem={BoardListItem} Active={SelectedBoard !== BoardListItem?.BoardId} BoardId={BoardListItem?.BoardId} Text={BoardListItem?.BoardName} HandleSelectBoard={HandleSelectBoard} />;
                  })}
              </>
            )}

            <AddBoardItem className=" rounded-md" />
          </div>

          {BoardList?.filter(FilterBoardsSharedWithMe).length > 0 && (
            <div className="w-full text-xs py-1 px-1 truncate mb-2 rounded-md text-center mt-5 cursor-pointer select-none" onClick={() => setShowSharedBoards(!ShowSharedBoards)}>
              <span className="truncate w-full flex flex-row justify-between">
                {Translations.Sidebar.SharedWithMe} ({BoardList?.filter(FilterBoardsSharedWithMe).length})
              </span>
            </div>
          )}

          <div className=" flex flex-col gap-2  w-full ">
            {ShowSharedBoards && (
              <>
                {[...BoardList]
                  .filter(FilterBoardsSharedWithMe)
                  .sort(OrderBoards)
                  .map((BoardListItem: any) => {
                    return <SidebarItem BoardListItem={BoardListItem} Active={SelectedBoard !== BoardListItem?.BoardId} BoardId={BoardListItem?.BoardId} Text={BoardListItem?.BoardName} HandleSelectBoard={HandleSelectBoard} />;
                  })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
