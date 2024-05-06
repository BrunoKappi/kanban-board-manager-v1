import { FileSpreadsheet } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { CardType, TaskType } from "@/Data/Types";

type Props = {
  Column: any;
};

export default function ExportColumnToCsv({ Column }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

  const BoardTags = [...Board?.Tags];

  function convertToCSVData() {
    const headers = ["Column Title", "Column Visible", "Card Title", "Card Description", "Tags", "Task Title", "Completed"];

    const data = Column?.Cards?.flatMap((card: CardType) =>
      card.Tasks?.map((task: TaskType) => [
        Column.ColumnTitle,
        Column.Visible ? "Visible" : "Not Visible",
        card.CardTitle,
        card.CardDescription,
        card.Tags?.map((tagId: string) => BoardTags.find((tag) => tag.TagId === tagId)?.TagName).join(", "), // Concatenates tag names
        task.TaskTitle,
        task.Completed ? "Completed" : "Not Completed",
      ])
    );

    return [headers, ...data];
  }

  const csvData = convertToCSVData();

  return (
    <CSVLink filename={`Kanban Export Column - ${Column.ColumnTitle}.csv`} data={csvData}>
      <ListOption>
        <FileSpreadsheet className="size-4" />
        {Translations.OptionsLists.ExportColumnToCSV}
      </ListOption>
    </CSVLink>
  );
}
