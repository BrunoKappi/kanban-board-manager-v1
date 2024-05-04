import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ColumnType } from "@/Data/Types";
import { DeleteColumnFn } from "./DeleteColumns.Utils";
import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";

type Props = {
  Column: ColumnType;
};

export default function DeleteColum({ Column }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const [open, setOpen] = useState(false);

  const HandleDeleteColumn = () => {
    setOpen(false);
    DeleteColumnFn(Column);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ListOption>
          <Trash2 className="size-4" />
          {Translations.OptionsLists.DeleteColumn}
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Translations.AlertDialog.DeleteColumn.Title}</h1>
          <AlertDialogDescription>{Translations.AlertDialog.DeleteColumn.Desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {Translations.AlertDialog.DeleteColumn.CancelButton}
          </Button>
          <Button variant="destructive" onClick={HandleDeleteColumn}>
            {Translations.AlertDialog.DeleteColumn.ActionButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
