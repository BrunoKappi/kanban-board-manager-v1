import { Copy } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { DuplicateBoardFn } from "./DuplicateBoard.Utils";
import { useSelector } from "react-redux";

type Props = {
  SetExternalOpen: (state: boolean) => void;
};

export default function DuplicateBoard({ SetExternalOpen }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const HandleDuplicateBoard = () => {
    SetExternalOpen(false);
    DuplicateBoardFn();
  };

  return (
    <ListOption onClick={HandleDuplicateBoard}>
      <Copy className="size-4" />
      {Translations.OptionsLists.DuplicateBoard}
    </ListOption>
  );
}
