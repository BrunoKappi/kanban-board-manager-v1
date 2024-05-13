import { ListOption } from "../ListOption/ListOption";
import { Sheet } from "lucide-react";
import { useSelector } from "react-redux";

import { ExportBoardExcel } from "@/lib/Convert";

function ExportBoardToExcel() {
  const Translations = useSelector((state: any) => state.Translations);
  const Board = useSelector((state: any) => state.Board);

  return (
    <ListOption onClick={() => ExportBoardExcel(Board)}>
      <Sheet className="size-4" />
      {Translations.OptionsLists.ExportExcel}
    </ListOption>
  );
}

export default ExportBoardToExcel;
