import { Copy } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { DuplicateBoardFn } from "./DuplicateBoard.Utils";

type Props = {
  SetExternalOpen: (state: boolean) => void;
};

export default function DuplicateBoard({ SetExternalOpen }: Props) {
  const HandleDuplicateBoard = () => {
    SetExternalOpen(false);
    DuplicateBoardFn();
  };

  return (
    <ListOption onClick={HandleDuplicateBoard}>
      <Copy className="size-4" />
      Duplicate Board
    </ListOption>
  );
}
