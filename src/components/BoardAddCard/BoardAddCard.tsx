import { SetCardModalCard, SetCardModalCardIndex, SetCardModalColumnIndex, SetCardModalMode } from "@/Config/Store/CardModal/CardModal";
import { useDispatch } from "react-redux";
import { DefaultCardToAdd } from "./BoardAddCard.Utils";
import { useSelector } from "react-redux";
import { HandleCreateCard } from "../CardModal/CardModal.Utils";
import moment from "moment";
import { v4 } from "uuid";
import { ListOption } from "../ListOption/ListOption";
import { Plus } from "lucide-react";

type Props = {
  ColumnIndex: number;
  Mode?: string;
};

export default function BoardAddCard({ ColumnIndex, Mode = "Button" }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);
  const dispatch = useDispatch();

  const NewIndex = Board.Columns[ColumnIndex]?.Cards.length;

  const NewTasks = [
    {
      TaskId: v4(),
      TaskTitle: Translations.Mocks.Task + " 1",
      Completed: false,
      CreatedAt: moment().valueOf(),
      LastEditedAt: moment().valueOf(),
    },
    {
      TaskId: v4(),
      TaskTitle: Translations.Mocks.Task + " 2",
      Completed: false,
      CreatedAt: moment().valueOf(),
      LastEditedAt: moment().valueOf(),
    },
  ];

  const Func = () => {};

  const HandleAddCard = () => {
    dispatch(SetCardModalMode("View"));
    //@ts-ignore
    dispatch(SetCardModalCardIndex(NewIndex));

    //@ts-ignore
    dispatch(SetCardModalColumnIndex(ColumnIndex));
    //@ts-ignore
    dispatch(
      //@ts-ignore
      SetCardModalCard({
        ...DefaultCardToAdd,
        CardTitle: Translations.Text.NewCardTitle,
        Tasks: [...NewTasks],
      })
    );
    HandleCreateCard(Translations.Text.NewCardTitle, DefaultCardToAdd.CardDescription, NewTasks, Func, Func); //@ts-ignore
  };

  return Mode === "Button" ? (
    <div className="px-3 line-clamp-2 text-card-foreground flex items-center justify-start  border-slate-200 hover:bg-white  py-2  w- rounded-md hover:text-primary min-h-10 cursor-pointer  dark:bg-overlay-dark  dark:hover:bg-overlay dark:border-overlay-dark dark:text-primary-foreground" onClick={HandleAddCard}>
      <span className=" line-clamp-2 select-none text-primary  font-medium text-sm">{Translations.Buttons.AddCard}</span>
    </div>
  ) : (
    <ListOption>
      <Plus className="size-4" />
      {Translations.Buttons.AddCard}
    </ListOption>
  );
}
