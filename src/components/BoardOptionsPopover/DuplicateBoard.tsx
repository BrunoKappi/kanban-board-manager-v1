import { Copy } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { DuplicateBoardFn } from "./DuplicateBoard.Utils";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type DuplicateBoardProps = {
  SetExternalOpen: (state: boolean) => void;
};

export default function DuplicateBoard({ SetExternalOpen }: DuplicateBoardProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const navigate = useNavigate();
  const HandleDuplicateBoard = () => {
    SetExternalOpen(false);
    DuplicateBoardFn();
    navigate("../");
  };

  return (
    <ListOption onClick={HandleDuplicateBoard}>
      <Copy className="size-4" />
      {Translations.OptionsLists.DuplicateBoard}
    </ListOption>
  );
}
