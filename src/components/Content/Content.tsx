import Navbar from "../Navbar/Navbar";
import { Board as BoardComponente } from "../Board/Board";

import { useSelector } from "react-redux";
import { GetBoard } from "@/Middleware/GetData";

import { useDispatch } from "react-redux";
import { SetBoard } from "@/Config/Store/Board/Boards";
import { useEffect } from "react";

export default function Content() {
  const SelectedBoard = useSelector((state: any) => state.SelectedBoard);
  const Board = useSelector((state: any) => state.Board);
  const dispatch = useDispatch();

  useEffect(() => {
    GetBoard(SelectedBoard).then((Data) => {
      //@ts-ignore
      dispatch(SetBoard(Data));
    });
  }, [SelectedBoard]);

  return (
    <div className="flex flex-col flex-grow h-full ">
      <Navbar Board={Board} />
      <BoardComponente Board={Board} />
    </div>
  );
}
