import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";
import { DeleteBoardFn } from "./DeleteBoard.Utils";

type Props = {
  SetExternalOpen: (state: boolean) => void;
};

export default function DeleteBoard({ SetExternalOpen }: Props) {
  const [open, setOpen] = useState(false);
  const Board = useSelector((state: any) => state.Board);

  const HandleDeleteBoard = () => {
    setOpen(false);
    SetExternalOpen(false);
    DeleteBoardFn(Board);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ListOption>
          <Trash2 className="size-4" />
          Delete Board
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">Are you sure you want to delete this Board?</h1>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete this Board.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={HandleDeleteBoard}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
