import { FileSpreadsheet } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { ColumnType } from "@/Data/Types";

type Props = {
  SetExternalOpen: (state: boolean) => void;
};

export default function ExportCSV({ SetExternalOpen }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

  const BoardTags = [...Board?.Tags];

  function convertToCSVData(board: any) {
    const headers = ["Board Name", "Column Title", "Column Visible", "Card Title", "Card Description", "Tags", "Task Title", "Task Completed"];

    const data = board.Columns.flatMap((column: ColumnType) =>
      column.Cards.flatMap((card) =>
        card.Tasks.map((task) => [
          board.BoardName,
          column.ColumnTitle,
          column.Visible ? "Visible" : "Not Visible",
          card.CardTitle,
          card.CardDescription,
          card.Tags?.map((tagId: string) => BoardTags.find((tag) => tag.TagId === tagId)?.TagName).join(", "), // Concatenates tag names
          task.TaskTitle,
          task.Completed ? "Completed" : "Not Completed",
        ])
      )
    );

    return [headers, ...data];
  }

  const csvData = convertToCSVData(Board);

  return (
    <CSVLink
      filename={`Kanban Export - ${Board.BoardName}.csv`}
      data={csvData}
      onClick={() => {
        SetExternalOpen(false);
      }}
    >
      <ListOption>
        <FileSpreadsheet className="size-4" />
        {Translations.OptionsLists.ExportCSV}
      </ListOption>
    </CSVLink>
  );
}
