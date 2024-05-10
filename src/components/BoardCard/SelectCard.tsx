import { ListOption } from "../ListOption/ListOption";
import { Pen } from "lucide-react";
import { useSelector } from "react-redux";
import { MIDDLEWARE_SetCardModal } from "@/Middleware/SetData";

type Props = {
  CardIndex: number;
  ColumnIndex: number;
  Card: any;
  Column: any;
};

export default function SelectCard({ CardIndex, ColumnIndex, Card, Column }: Props) {
  const Board = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);

  const HandleSelectCard = () => {
    var NewColumnIndex = ColumnIndex;

    Board?.Columns?.forEach((element: any, index: number) => {
      if (element.ColumId === Column.ColumId) NewColumnIndex = index;
    });

    MIDDLEWARE_SetCardModal("View", CardIndex, NewColumnIndex, Card);
  };
  return (
    <ListOption className="flex flex-row items-center justify-start" onClick={() => HandleSelectCard()}>
      <Pen className="size-4" />
      <span className="mt-1"> {Translations.OptionsLists.EditCard}</span>
    </ListOption>
  );
}
