import { ListOption } from "../ListOption/ListOption";

import { useDispatch } from "react-redux";
import { Pen } from "lucide-react";
import { SetCardModalCard, SetCardModalCardIndex, SetCardModalColumnIndex, SetCardModalMode } from "@/Config/Store/CardModal/CardModal";

type Props = {
  CardIndex: number;
  ColumIndex: number;
  Card: any;
};

export default function SelectCard({ CardIndex, ColumIndex, Card }: Props) {
  const dispatch = useDispatch();

  const HandleSelectCard = () => {
    //@ts-ignore
    dispatch(SetCardModalMode("View"));
    //@ts-ignore
    dispatch(SetCardModalCardIndex(CardIndex));
    //@ts-ignore
    dispatch(SetCardModalColumnIndex(ColumIndex));
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
