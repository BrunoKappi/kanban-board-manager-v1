import { CardType } from "@/Data/Types";
import moment from "moment";
import { v4 } from "uuid";

export const DefaultCardToAdd: CardType = {
  ShowTasksOnCard: false,
  ShowDatesOnCard: false,
  StartAt: 0,
  EndAt: 0,
  CardId: v4(),
  CardTitle: "New Card",
  CardDescription: "",
  CreatedAt: moment().valueOf(),
  LastEditedAt: moment().valueOf(),
  Notes: "",
  TasksQtd: 2,
  Tags: [],
  Tasks: [
    {
      TaskId: v4(),
      TaskTitle: "Task 1",
      Completed: false,
      CreatedAt: 0,
      LastEditedAt: 0,
    },
    {
      TaskId: v4(),
      TaskTitle: "Task 2",
      Completed: false,
      CreatedAt: 0,
      LastEditedAt: 0,
    },
  ],
};
