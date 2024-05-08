import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ListOption } from "../ListOption/ListOption";
import { Sheet } from "lucide-react";
import { useSelector } from "react-redux";
import { ColumnType } from "@/Data/Types";

function ExportBoardToExcel() {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);
  const BoardTags = [...(Board?.Tags || [])];

  const exportToExcel = () => {
    const Data = Board.Columns.flatMap((column: ColumnType) => {
      return column.Cards.flatMap((card) => {
        return card.Tasks.map((task) => ({
          "Board Name": Board.BoardName,
          "Column Title": column.ColumnTitle,
          "Column Visible": column.Visible ? "Visible" : "Not Visible",
          "Card Title": card.CardTitle,
          "Card Description": card.CardDescription,
          Tags: (card.Tags || []).map((tagId) => BoardTags.find((tag) => tag.TagId === tagId)?.TagName).join(", "),
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

  return (
    <ListOption onClick={exportToExcel}>
      <Sheet className="size-4" />
      {Translations.OptionsLists.ExportExcel}
    </ListOption>
  );
}

export default ExportBoardToExcel;
