import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bookmark, Columns2, Columns3, GripVertical, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { MinimalInput } from "../ui/minimalInput";
import ColorPicker from "../ColorPicker/ColorPicker";
import { Button } from "../ui/button";
import { DefaultBoardColumns, HandleAddColumn, HandleColumnColor, HandleColumnTitle, HandleCreateBoard, HandleDeleteColumn, HandleDragColumns } from "./AddBoardItem.Utils";
import { Textarea } from "../ui/textarea";
import Tooltip from "../Tooltip/Tooltip";
import Show from "@/lib/Show";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { cn } from "@/lib/utils";
import { MAX_BOARD_TITLE, MAX_COLUMN_TITLE, MAX_DESC } from "@/Data/Limits";

const GetDefaultBoardColumns = () => {
  return [
    ...DefaultBoardColumns.map((BoardColumn) => {
      return { ...BoardColumn };
    }),
  ];
};

export function AddBoardItem({ className }: { className?: any }) {
  const [open, setOpen] = useState(false);
  const [Reorder] = useState(false);
  const [BoardName, setBoardName] = useState("");
  const [BoardDesc, setBoardDesc] = useState("");
  const [Message, setMessage] = useState("");
  const [BoardColumns, setBoardColumns] = useState(GetDefaultBoardColumns());
  const [FocusOn, setFocusOn] = useState(0);
  const [FocusWhat, setFocusWhat] = useState("");

  useEffect(() => {
    setBoardName("");
    setBoardDesc("");
    setMessage("");
    setBoardColumns(GetDefaultBoardColumns());
    setFocusOn(0);
    setFocusWhat("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={cn("flex flex-row justify-start items-center gap-2  w-full px-3 py-2  text-primary  cursor-pointer hover:bg-primary hover:text-primary-foreground", className)}>
          <Columns3 className="size-5 flex-shrink-0" />
          <span className="truncate text-sm">+ Create Board</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[550px] max-h-[90dvh] overflow-y-scroll bg-background dark:bg-background-dark-dialog border dark:border-border-dark p-10 flex flex-col justify-start items-start">
        <DialogHeader className="mb-8">
          <DialogTitle className="dark:text-accent text-accent-foreground text-xl">Create Board</DialogTitle>
        </DialogHeader>
        <h2 className="mt-5 text-lg flex flex-row gap-2 items-center w-full bg-overlay dark:bg-overlay-dark py-0.5 px-1 rounded-md">
          <Bookmark className="size-5" />
          Board Name
        </h2>
        <MinimalInput
          maxLength={MAX_BOARD_TITLE}
          placeholder="Board Name"
          value={BoardName}
          onChange={(e) => {
            setFocusWhat("BoardName");
            setBoardName(e.target.value);
          }}
        />

        <h2 className="mt-5 text-lg flex flex-row gap-2 items-center w-full bg-overlay dark:bg-overlay-dark py-0.5 px-1 rounded-md">
          <PencilLine className="size-5" />
          Description
        </h2>

        <Textarea
          maxLength={MAX_DESC}
          placeholder="Board Description(Optional)"
          className=" resize-none border-none ring-0 shadow-none focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 px-0 overflow-visible"
          value={BoardDesc}
          onChange={(e) => {
            setFocusWhat("BoardDesc");
            setBoardDesc(e.target.value);
          }}
        />
        <div className="flex flex-row gap-2 items-center mt-5 justify-between w-full">
          <h2 className="mt-5 text-lg flex flex-row gap-2 items-center w-full bg-overlay dark:bg-overlay-dark py-0.5 px-1 rounded-md">
            <Columns2 className="size-5" />
            Board Columns
          </h2>
          {/* <span className="flex flex-row gap-2 items-center mt-5">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" checked={Reorder} onClick={() => setReorder(!Reorder)} />
              <Label htmlFor="airplane-mode">Reorder</Label>
            </div>
          </span> */}
        </div>

        <Show if={!Reorder}>
          <DragDropContext
            onDragEnd={(Result) => {
              HandleDragColumns(Result, BoardColumns, setBoardColumns);
            }}
          >
            <Droppable droppableId={v4()} key={v4()}>
              {(provided: any) => {
                return (
                  <div className={`w-full py-3`} {...provided.droppableProps} ref={provided.innerRef}>
                    {BoardColumns.map((BoardColumn, ColumnIndex) => {
                      return (
                        <Draggable key={BoardColumn.ColumnTitle} draggableId={BoardColumn.ColumnTitle} index={ColumnIndex}>
                          {(DragProvided: any, snapshot) => {
                            return (
                              <span className={snapshot.isDragging ? "ITEM flex flex-row items-center gap-10 w-full" : "ITEM flex flex-row items-center gap-10 w-full"} ref={DragProvided.innerRef} style={DragProvided.draggableProps.style} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                                <div className="flex flex-row items-center flex-grow gap-2">
                                  <Tooltip text="Grab to Reorder">
                                    <GripVertical className="h-5" />
                                  </Tooltip>
                                  <MinimalInput
                                    maxLength={MAX_COLUMN_TITLE}
                                    placeholder="Column Title"
                                    value={BoardColumn.ColumnTitle}
                                    autoFocus={ColumnIndex === FocusOn && FocusWhat === "BoardColumn"}
                                    onChange={(e) => {
                                      setFocusWhat("BoardColumn");
                                      setFocusOn(ColumnIndex);

                                      HandleColumnTitle(e.target.value, ColumnIndex, setBoardColumns, BoardColumns);
                                    }}
                                    className="flex-grow"
                                  />
                                </div>
                                <ColorPicker onSelect={(Value: any) => HandleColumnColor(Value, ColumnIndex, setBoardColumns, BoardColumns)} color={BoardColumn.ColumnColor} />

                                <Tooltip text="Delete Column">
                                  <Trash2 className="size-5 cursor-pointer" onClick={() => HandleDeleteColumn(ColumnIndex, setBoardColumns, BoardColumns)} />
                                </Tooltip>
                              </span>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  </div>
                );
              }}
            </Droppable>
          </DragDropContext>
        </Show>

        <Show if={!Reorder && false}>
          {BoardColumns.map((BoardColumn, ColumnIndex) => {
            return (
              <span className={"ITEM flex flex-row items-center gap-10 w-full"}>
                <div className="flex flex-row items-center flex-grow gap-2">
                  <MinimalInput maxLength={MAX_COLUMN_TITLE} placeholder="Column Title" value={BoardColumn.ColumnTitle} onChange={(e) => HandleColumnTitle(e.target.value, ColumnIndex, setBoardColumns, BoardColumns)} className="flex-grow" />
                </div>

                <ColorPicker onSelect={(Value: any) => HandleColumnColor(Value, ColumnIndex, setBoardColumns, BoardColumns)} color={BoardColumn.ColumnColor} />

                <Tooltip text="Delete Column">
                  <Trash2 className="size-5 cursor-pointer" onClick={() => HandleDeleteColumn(ColumnIndex, setBoardColumns, BoardColumns)} />
                </Tooltip>
              </span>
            );
          })}
        </Show>

        <Show if={!Reorder}>
          <Button className="w-full" variant="outline" onClick={() => HandleAddColumn(setBoardColumns, BoardColumns)}>
            + Add Column
          </Button>
        </Show>
        <Show if={!!Message}>
          <span className=" text-destructive ">{Message}</span>
        </Show>

        <DialogFooter className="mt-5 flex flex-row justify-end w-full">
          <Button onClick={() => HandleCreateBoard(BoardName, BoardColumns, BoardDesc, setMessage, setOpen)}>Create Board</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
