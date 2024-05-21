import { Copy } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { DuplicateBoardFn } from "./DuplicateBoard.Utils";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateQueryStringParameter } from "@/lib/utils";
import { BoardType } from "@/Data/Types";

type DuplicateBoardProps = {
  SetExternalOpen: (state: boolean) => void;
};

export default function DuplicateBoard({ SetExternalOpen }: DuplicateBoardProps) {
  let [searchParams] = useSearchParams();
  const Board: BoardType = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);
  const navigate = useNavigate();
  const HandleDuplicateBoard = () => {
    SetExternalOpen(false);
    DuplicateBoardFn();
    navigate({
      pathname: "../",
      search: searchParams.toString(),
    });
    updateQueryStringParameter("Board", Board.BoardId);
  };

  return (
    <ListOption onClick={HandleDuplicateBoard}>
      <Copy className="size-4" />
      {Translations.OptionsLists.DuplicateBoard}
    </ListOption>
  );
}
