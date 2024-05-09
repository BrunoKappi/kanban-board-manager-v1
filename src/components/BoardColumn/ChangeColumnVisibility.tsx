import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ColumnType } from "@/Data/Types";
import { ChangeColumnVisibilityFn } from "./ChangeColumnVisibility.Utils";
import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";

type Props = {
  Column: ColumnType;
  ColumnIndex: number;
};

export default function ChangeColumnVisibility({ Column, ColumnIndex }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const [open, setOpen] = useState(false);

  const HandleChangeColumnVisibility = () => {
    setOpen(false);
    ChangeColumnVisibilityFn(Column, ColumnIndex);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ListOption>
          {Column.Visible && <EyeOff className="size-4" />}
          {!Column.Visible && <Eye className="size-4" />}
          {Column.Visible && Translations.PopoversSubtitles.HideGroup}
          {!Column.Visible && Translations.PopoversSubtitles.ShowGroup}
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          {Column.Visible && <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Translations.AlertDialog.HideColumn.Title}</h1>}
          {!Column.Visible && <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Translations.AlertDialog.ShowColumn.Title}</h1>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {Translations.AlertDialog.HideColumn.CancelButton}
          </Button>
          <Button variant="default" onClick={HandleChangeColumnVisibility}>
            {Column.Visible && Translations.AlertDialog.HideColumn.ActionButton}
            {!Column.Visible && Translations.AlertDialog.ShowColumn.ActionButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
