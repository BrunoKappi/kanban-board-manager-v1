import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ColumnType } from "@/Data/Types";
import { DeleteColumnFn } from "./DeleteColumns.Utils";
import { ListOption } from "../ListOption/ListOption";

type Props = {
  Column: ColumnType;
};

export default function DeleteColum({ Column }: Props) {
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
          Delete Column
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">Are you sure you want to delete this column?</h1>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete this column of your board.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={HandleDeleteColumn}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
