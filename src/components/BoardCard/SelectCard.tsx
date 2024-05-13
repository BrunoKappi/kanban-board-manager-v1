import { ListOption } from "../ListOption/ListOption";
import { Pen } from "lucide-react";
import { useSelector } from "react-redux";
import { BoardType, CardType, ColumnType } from "@/Data/Types";
import { STORE_SetCardModal } from "@/Middleware/Store";

type Props = {
  CardIndex: number;
  ColumnIndex: number;
  Card: CardType;
  Column: ColumnType;
};

export default function SelectCard({ CardIndex, ColumnIndex, Card, Column }: Props) {
  const Board: BoardType = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);

  const HandleSelectCard = () => {
    var NewColumnIndex = ColumnIndex;

    Board?.Columns?.forEach((element: ColumnType, index: number) => {
      if (element.ColumId === Column.ColumId) NewColumnIndex = index;
    });

    STORE_SetCardModal("View", CardIndex, NewColumnIndex, Card);
  };
  return (
    <ListOption className="flex flex-row items-center justify-start" onClick={() => HandleSelectCard()}>
      <Pen className="size-4" />
      <span className="mt-1"> {Translations.OptionsLists.EditCard}</span>
    </ListOption>
  );
}
