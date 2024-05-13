import { DefaultCardToAdd } from "./BoardAddCard.Utils";
import { useSelector } from "react-redux";
import { HandleCreateCard } from "../CardModal/CardModal.Utils";
import moment from "moment";
import { v4 } from "uuid";
import { ListOption } from "../ListOption/ListOption";
import { Plus } from "lucide-react";
import { TaskType } from "@/Data/Types";
import { STORE_SetCardModal } from "@/Middleware/Store";

type BoardAddCardProps = {
  ColumnIndex: number;
  Mode?: string;
};

export default function BoardAddCard({ ColumnIndex, Mode = "Button" }: BoardAddCardProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

  const NewIndex = Board.Columns[ColumnIndex]?.Cards.length;

  const NewTasks: TaskType[] = [
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

  const HandleAddCard = () => {
    STORE_SetCardModal("View", NewIndex, ColumnIndex, {
      ...DefaultCardToAdd,
      CardTitle: Translations.Text.NewCardTitle,
      Tasks: [...NewTasks],
    });
    HandleCreateCard(
      Translations.Text.NewCardTitle,
      DefaultCardToAdd.CardDescription,
      NewTasks,
      () => {},
      () => {}
    );
  };

  return Mode === "Button" ? (
    <div className="px-3 line-clamp-2 text-card-foreground flex items-center justify-start  border-slate-200 hover:bg-white  py-2  w- rounded-md hover:text-primary min-h-10 cursor-pointer  dark:bg-overlay-dark  dark:hover:bg-overlay dark:border-overlay-dark dark:text-primary-foreground" onClick={HandleAddCard}>
      <span className=" line-clamp-2 select-none text-primary  font-medium text-sm">{Translations.Buttons.AddCard}</span>
    </div>
  ) : (
    <ListOption onClick={HandleAddCard}>
      <Plus className="size-4" />
      {Translations.Buttons.AddCard}
    </ListOption>
  );
}
