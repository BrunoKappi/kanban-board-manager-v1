import { Button } from "../ui/button";

import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { TagType } from "@/Data/Types";
import { HandleDeleteBoardTag } from "./DeleteBoardTag.Utils";

type Props = {
  Tag: TagType;
};

export default function DeleteBoardTag({ Tag }: Props) {
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
          <h1 className="text-lg mb-5 dark:text-accent text-accent-foreground">Are you sure you want to delete this Tag?</h1>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete this Tag of your board.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={DeleteBoardTag}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
