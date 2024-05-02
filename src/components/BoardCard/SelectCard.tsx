import { ListOption } from "../ListOption/ListOption";

import { useDispatch } from "react-redux";
import { Pen } from "lucide-react";
import { SetCardModalCard, SetCardModalCardIndex, SetCardModalColumnIndex, SetCardModalMode } from "@/Config/Store/CardModal/CardModal";
import { useSelector } from "react-redux";

type Props = {
  CardIndex: number;
  ColumIndex: number;
  Card: any;
  Column: any;
};

export default function SelectCard({ CardIndex, ColumIndex, Card, Column }: Props) {
  const Board = useSelector((state: any) => state.Board);
  const dispatch = useDispatch();

  const HandleSelectCard = () => {
    var NewColumnIndex = ColumIndex;

    Board?.Columns?.forEach((element: any, index: number) => {
      if (element.ColumId === Column.ColumId) NewColumnIndex = index;
    });

    //@ts-ignore
    dispatch(SetCardModalMode("View"));
    //@ts-ignore
    dispatch(SetCardModalCardIndex(CardIndex));
    //@ts-ignore
    dispatch(SetCardModalColumnIndex(NewColumnIndex));
    //@ts-ignore
    dispatch(SetCardModalCard(Card));
  };
  return (
    <ListOption className="flex flex-row items-center justify-start" onClick={() => HandleSelectCard()}>
      <Pen className="size-4" />
      <span className="mt-1"> Edit Card</span>
    </ListOption>
  );
}
