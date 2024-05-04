import Show from "@/lib/Show";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { HandleDeleteCard } from "./DeleteCard.Utils";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

type Props = {
  setOpen: (state: boolean) => void;
};

export default function DeleteCard({ setOpen }: Props) {
  const [Dialogopen, setDialogOpen] = useState(false);
  const CardModal = useSelector((state: any) => state.CardModal);
  const Translations = useSelector((state: any) => state.Translations);

  const DeleteCard = () => {
    HandleDeleteCard();
    setOpen(false);
    setDialogOpen(false);
  };

  return (
    <AlertDialog open={Dialogopen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>
        <Show if={CardModal.Mode === "View"}>
          <div className="mt-5 flex flex-row justify-end w-full">
            <Button
              variant="destructive"
              onClick={() => {
                setDialogOpen(true);
              }}
            >
              {Translations.OptionsLists.DeleteCard}
            </Button>
          </div>
        </Show>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Translations.AlertDialog.DeleteCard.Title}</h1>
          <AlertDialogDescription>{Translations.AlertDialog.DeleteCard.Desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            {Translations.AlertDialog.DeleteCard.CancelButton}
          </Button>
          <Button variant="destructive" onClick={DeleteCard}>
            {Translations.AlertDialog.DeleteCard.ActionButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
