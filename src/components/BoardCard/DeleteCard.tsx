import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

import { ListOption } from "../ListOption/ListOption";
import { HandleDeleteCard } from "./DeleteCard.Utils";

type Props = {
  CardIndex: number;
  ColumnIndex: number;
  Column: any;
};

export default function DeleteCard({ CardIndex, ColumnIndex, Column }: Props) {
  const [open, setOpen] = useState(false);

  const HandleDeleteCardn = () => {
    setOpen(false);
    HandleDeleteCard(ColumnIndex, CardIndex, Column);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ListOption className="flex flex-row items-center justify-start">
          <Trash2 className="size-4" />
          <span className="mt-1">Delete Card</span>
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">Are you sure you want to delete this Card?</h1>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete this Card of your board.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={HandleDeleteCardn}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
