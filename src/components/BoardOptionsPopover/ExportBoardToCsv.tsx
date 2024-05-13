import { FileSpreadsheet } from "lucide-react";
import { ListOption } from "../ListOption/ListOption";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";
import { ConvertBoardToCSV } from "@/lib/Convert";

type ExportCSVProps = {
  SetExternalOpen: (state: boolean) => void;
};

export default function ExportCSV({ SetExternalOpen }: ExportCSVProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

  const csvData = ConvertBoardToCSV(Board);

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
