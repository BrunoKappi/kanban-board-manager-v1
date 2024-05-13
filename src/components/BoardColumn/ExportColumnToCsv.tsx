import { FileSpreadsheet } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { ColumnType } from "@/Data/Types";
import { ConvertColumnToCSV } from "@/lib/Convert";

type ExportColumnToCsvProps = {
  Column: ColumnType;
};

export default function ExportColumnToCsv({ Column }: ExportColumnToCsvProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

  const csvData = ConvertColumnToCSV(Column, Board);

  return (
    <CSVLink filename={`Kanban Export Column - ${Column.ColumnTitle}.csv`} data={csvData}>
      <ListOption>
        <FileSpreadsheet className="size-4" />
        {Translations.OptionsLists.ExportColumnToCSV}
      </ListOption>
    </CSVLink>
  );
}
