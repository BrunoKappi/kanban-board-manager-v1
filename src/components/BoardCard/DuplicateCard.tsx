import { Copy } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { HandleDuplicateCard } from "./DuplicateCard.Utils";
import { useSelector } from "react-redux";

type Props = {
  CardIndex: number;
  ColumnIndex: number;
};

export default function DuplicateCard({ CardIndex, ColumnIndex }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const DuplicateCard = () => {
    HandleDuplicateCard(ColumnIndex, CardIndex);
  };
  return (
    <ListOption className="flex flex-row items-center justify-start" onClick={DuplicateCard}>
      <Copy className="size-4" />
      <span className="mt-1">{Translations.OptionsLists.DuplicateCard}</span>
    </ListOption>
  );
}
