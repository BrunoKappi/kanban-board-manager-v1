import { SetCardModalCard, SetCardModalCardIndex, SetCardModalColumnIndex, SetCardModalMode } from "@/Config/Store/CardModal/CardModal";
import { useDispatch } from "react-redux";
import { DefaultCardToAdd } from "./BoardAddCard.Utils";
import { useSelector } from "react-redux";

type Props = {
  ColumnIndex: number;
};

export default function BoardAddCard({ ColumnIndex }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const dispatch = useDispatch();

  const HandleAddCard = () => {
    //@ts-ignore
    dispatch(SetCardModalMode("Add"));
    //@ts-ignore
    dispatch(SetCardModalCardIndex(2));
    //@ts-ignore
    dispatch(SetCardModalColumnIndex(ColumnIndex));
    //@ts-ignore
    dispatch(
      //@ts-ignore
      SetCardModalCard({
        ...DefaultCardToAdd,
      })
    );
  };

  return (
    <div className="px-3 line-clamp-2 text-card-foreground flex items-center justify-start  border-slate-200 hover:bg-white  py-2  w- rounded-md hover:text-primary min-h-10 cursor-pointer  dark:bg-overlay-dark  dark:hover:bg-overlay dark:border-overlay-dark dark:text-primary-foreground" onClick={HandleAddCard}>
      <span className=" line-clamp-2 select-none text-primary  font-medium text-sm">{Translations.Buttons.AddCard}</span>
    </div>
  );
}
