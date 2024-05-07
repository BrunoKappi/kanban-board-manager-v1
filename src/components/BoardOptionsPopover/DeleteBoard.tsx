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
  const Translations = useSelector((state: any) => state.Translations);
  const IsBoardOwner = useSelector((state: any) => state.IsBoardOwner);

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
          {IsBoardOwner && Translations.OptionsLists.DeleteBoard}
          {!IsBoardOwner && Translations.OptionsLists.DeleteBoardForMe}
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Translations.AlertDialog.DeleteBoard.Title}</h1>
          <AlertDialogDescription>{Translations.AlertDialog.DeleteBoard.Desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {Translations.AlertDialog.DeleteBoard.CancelButton}
          </Button>
          <Button variant="destructive" onClick={HandleDeleteBoard}>
            {Translations.AlertDialog.DeleteBoard.CancelButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
