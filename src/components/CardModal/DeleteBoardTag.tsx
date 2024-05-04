import { Button } from "../ui/button";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { TagType } from "@/Data/Types";
import { HandleDeleteBoardTag } from "./DeleteBoardTag.Utils";
import { useSelector } from "react-redux";

type Props = {
  Tag: TagType;
};

export default function DeleteBoardTag({ Tag }: Props) {
  const Translations = useSelector((state: any) => state.Translations);
  const [Open, setOpen] = useState(false);

  const DeleteBoardTag = (e: any) => {
    e.stopPropagation();
    HandleDeleteBoardTag(Tag);
    setOpen(false);
  };

  return (
    <AlertDialog open={Open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Trash2 className="size-4 p-0.3 cursor-pointer flex-shrink-0" onClick={(e) => e.stopPropagation()} />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-background dark:bg-background-dark-dialog dark:border-border-dark" onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">{Translations.AlertDialog.DeleteTag.Title}</h1>
          <AlertDialogDescription>{Translations.AlertDialog.DeleteTag.Desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            {Translations.AlertDialog.DeleteTag.CancelButton}
          </Button>
          <Button variant="destructive" onClick={DeleteBoardTag}>
            {Translations.AlertDialog.DeleteTag.ActionButton}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
