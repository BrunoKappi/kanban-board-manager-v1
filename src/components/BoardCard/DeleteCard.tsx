import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { ListOption } from "../ListOption/ListOption";
import { HandleDeleteCard } from "./DeleteCard.Utils";
import { useSelector } from "react-redux";

type DeleteCardProps = {
  CardIndex: number;
  ColumnIndex: number;
};

export default function DeleteCard({ CardIndex, ColumnIndex }: DeleteCardProps) {
  const Translations = useSelector((state: any) => state.Translations);
  const [open, setOpen] = useState(false);

  const HandleDeleteCardn = () => {
    setOpen(false);
    HandleDeleteCard(ColumnIndex, CardIndex);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <ListOption className="flex flex-row items-center justify-start">
          <Trash2 className="size-4" />
          <span className="mt-1">{Translations.Buttons.DeleteCard}</span>
        </ListOption>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Translations.AlertDialog.DeleteCard.Title}</h1>
          <AlertDialogDescription>{Translations.AlertDialog.DeleteCard.Desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {Translations.AlertDialog.DeleteCard.CancelButton}
          </Button>
          <Button variant="destructive" onClick={HandleDeleteCardn}>
            {Translations.AlertDialog.DeleteCard.ActionButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
