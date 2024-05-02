import { Copy } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { HandleDuplicateCard } from "./DuplicateCard.Utils";

type Props = {
  CardIndex: number;
  ColumIndex: number;
  Column: any;
};

export default function DuplicateCard({ CardIndex, ColumIndex, Column }: Props) {
  const DuplicateCard = () => {
    HandleDuplicateCard(ColumIndex, CardIndex, Column);
  };
  return (
    <ListOption className="flex flex-row items-center justify-start" onClick={DuplicateCard}>
      <Copy className="size-4" />
      <span className="mt-1">Duplicate Card</span>
    </ListOption>
  );
}
