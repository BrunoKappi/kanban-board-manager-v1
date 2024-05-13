import { BoardType, CardType, ColumnType, TaskType } from "@/Data/Types";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const ConvertColumnToCSV = (Column: ColumnType, Board: BoardType) => {
  const CSV_HEADERS = ["Column Title", "Column Visible", "Card Title", "Card Description", "Tags", "Task Title", "Completed"];

  const CSV_Data = Column?.Cards?.flatMap((card: CardType) =>
    card.Tasks?.map((task: TaskType) => [
      Column.ColumnTitle,
      Column.Visible ? "Visible" : "Not Visible",
      card.CardTitle,
      card.CardDescription,
      card.Tags?.map((tagId: string) => Board.Tags.find((tag) => tag.TagId === tagId)?.TagName).join(", "), // Concatenates tag names
      task.TaskTitle,
      task.Completed ? "Completed" : "Not Completed",
    ])
  );

  return [CSV_HEADERS, ...CSV_Data];
};

export const ConvertBoardToCSV = (board: BoardType) => {
  const headers = ["Board Name", "Column Title", "Column Visible", "Card Title", "Card Description", "Tags", "Task Title", "Task Completed"];

  const data = board.Columns.flatMap((column: ColumnType) =>
    column.Cards.flatMap((card) =>
      card.Tasks.map((task) => [
        board.BoardName,
        column.ColumnTitle,
        column.Visible ? "Visible" : "Not Visible",
        card.CardTitle,
        card.CardDescription,
        card.Tags?.map((tagId: string) => board.Tags.find((tag) => tag.TagId === tagId)?.TagName).join(", "), // Concatenates tag names
        task.TaskTitle,
        task.Completed ? "Completed" : "Not Completed",
      ])
    )
  );

  return [headers, ...data];
};

export const ExportBoardExcel = (Board: BoardType) => {
  const Data = Board.Columns.flatMap((column: ColumnType) => {
    return column.Cards.flatMap((card) => {
      return card.Tasks.map((task) => ({
        "Board Name": Board.BoardName,
        "Column Title": column.ColumnTitle,
        "Column Visible": column.Visible ? "Visible" : "Not Visible",
        "Card Title": card.CardTitle,
        "Card Description": card.CardDescription,
        Tags: (card.Tags || []).map((tagId) => Board.Tags.find((tag) => tag.TagId === tagId)?.TagName).join(", "),
        "Task Title": task.TaskTitle,
        "Task Completed": task.Completed ? "Completed" : "Not Completed",
      }));
    });
  });
  const worksheet = XLSX.utils.json_to_sheet(Data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });

  saveAs(blob, `Kanban Export - ${Board.BoardName}.xlsx`);
};
