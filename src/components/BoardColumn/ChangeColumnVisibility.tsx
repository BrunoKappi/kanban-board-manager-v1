import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ColumnType } from "@/Data/Types";
import { ChangeColumnVisibilityFn } from "./ChangeColumnVisibility.Utils";
import { ListOption } from "../ListOption/ListOption";

type Props = {
  Column: ColumnType;
};

export default function ChangeColumnVisibility({ Column }: Props) {
  const [open, setOpen] = useState(false);

  const HandleChangeColumnVisibility = () => {
    setOpen(false);
    ChangeColumnVisibilityFn(Column);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ListOption>
          {Column.Visible && <EyeOff className="size-4" />}
          {!Column.Visible && <Eye className="size-4" />}
          {Column.Visible && "Hide Group"}
          {!Column.Visible && "Show Group"}
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          {Column.Visible && <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">Are you sure you want to hide this column?</h1>}
          {!Column.Visible && <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">Are you sure you want to make this column visible?</h1>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={HandleChangeColumnVisibility}>
            {Column.Visible && "Hide"}
            {!Column.Visible && "Show"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
