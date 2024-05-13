import { Button } from "../ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";

type DialogPopupProps = {
  setOpen: (state: boolean) => void;
  Children: ReactNode;
  Title: string;
  Desc: string;
  CancelText: string;
  ActionText: string;
  OnAction: any;
  ButtonVariant: "destructive" | "default";
};

export default function DialogPopup({ setOpen, Children, Title, Desc, CancelText, ActionText, OnAction, ButtonVariant = "default" }: DialogPopupProps) {
  const [Dialogopen, setDialogOpen] = useState(false);

  const DialogPopup = () => {
    setOpen(false);
    setDialogOpen(false);
    OnAction();
  };

  return (
    <AlertDialog open={Dialogopen} onOpenChange={setDialogOpen}>
      <AlertDialogTrigger asChild>{Children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark">
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Title}</h1>
          {Desc && <AlertDialogDescription>{Desc}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            {CancelText}
          </Button>
          <Button variant={ButtonVariant} onClick={DialogPopup}>
            {ActionText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
