import { v4 } from "uuid";

export const DefaultCardToAdd = {
  CardId: v4(),
  CardTitle: "",
  CardDescription: "",
  CreatedAt: 0,
  LastEditedAt: 0,
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
