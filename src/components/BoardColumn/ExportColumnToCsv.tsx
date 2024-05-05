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

  function convertToCSVData() {
    const headers = ["Column Title", "Card Title", "Card Description", "Task Title"];

    const data = Column.Cards.flatMap((card: CardType) => card.Tasks.map((task: TaskType) => [Column.ColumnTitle, card.CardTitle, card.CardDescription, task.TaskTitle]));

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
