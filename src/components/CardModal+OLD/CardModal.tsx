import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { GripVertical, Pencil } from "lucide-react";
import { useState } from "react";
import { MinimalInput } from "../ui/minimalInput";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import Show from "@/lib/Show";
import { ListOption } from "../ListOption/ListOption";

import { TaskType } from "@/Data/Types";
import { Checkbox } from "../ui/checkbox";
import { HandleAddTask, HandleChangeTaskTitle, HandleDragTasks, HandleSaveBoard, HandleToggleTask } from "./CardModal.Utils";
import { v4 } from "uuid";
import Tooltip from "../Tooltip/Tooltip";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { MAX_CARD_TITLE, MAX_COLUMN_TITLE, MAX_DESC } from "@/Data/Limits";

type Props = {
  Card: any;
  Column: any;
  ColumnIndex: number;
  CardIndex: number;
};

const CardModal = ({ Card, Column, ColumnIndex, CardIndex }: Props) => {
  const [open, setOpen] = useState(false);
  const [Reorder] = useState(false);
  const [FocusOn, setFocusOn] = useState(0);
  const [CardTile, setCardTile] = useState(Card?.CardTitle);
  const [CardDesc, setCardDesc] = useState(Card?.CardDescription);
  const [Message] = useState("");
  const [CardTasks, setCardTasks] = useState([...(Card?.Tasks || [])]);
  const [Board, setBoard] = useState({});

  const HandleDialogChange = (State: boolean) => {
    setOpen(State);

    //@ts-ignore
    if (!!Board?.BoardId && !State) {
      HandleSaveBoard(Board);
    }
  };

  return (
    <Dialog open={open} onOpenChange={HandleDialogChange}>
      <DialogTrigger asChild>
        <ListOption>
          <Pencil className="size-4" />
          Edit Card
        </ListOption>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[550px] max-h-[90dvh] overflow-y-scroll bg-background dark:bg-background-dark-dialog border dark:border-border-dark p-10 flex flex-col justify-start items-start">
        <MinimalInput maxLength={MAX_CARD_TITLE} placeholder="Card Title" value={CardTile} onChange={(e) => setCardTile(e.target.value.trim())} />

        <h2 className="mt-5 text-lg">Tasks</h2>

        <DragDropContext onDragEnd={(Result) => HandleDragTasks(Result, CardTasks, setCardTasks, Column, ColumnIndex, CardIndex, setBoard)}>
          <Droppable droppableId={v4()} key={v4()}>
            {(provided: any) => {
              return (
                <div className={`w-full py-3 flex flex-col gap-4`} {...provided.droppableProps} ref={provided.innerRef}>
                  {CardTasks.map((Task: TaskType, Index) => {
                    return (
                      <Draggable key={Task.TaskId} draggableId={Task.TaskId} index={Index}>
                        {(DragProvided: any) => {
                          return (
                            <div className="ITEM flex items-center space-x-2 w-full" ref={DragProvided.innerRef} style={DragProvided.draggableProps.style} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
                              <Checkbox id="terms" checked={Task.Completed} onClick={() => HandleToggleTask(Index, setCardTasks, CardTasks)} />
                              <MinimalInput
                                maxLength={MAX_COLUMN_TITLE}
                                placeholder="Column Title"
                                autoFocus={Index === FocusOn}
                                key={v4()}
                                className="m-0 py-0 px-0 h-auto"
                                value={Task.TaskTitle}
                                onChange={(e) => {
                                  setFocusOn(Index);
                                  HandleChangeTaskTitle(e.target.value.trim(), Index, setCardTasks, CardTasks);
                                }}
                              />
                              <Tooltip text="Grab to Reorder">
                                <GripVertical className="h-5" />
                              </Tooltip>
                            </div>
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

        <Show if={!Reorder}>
          <Button variant="outline" onClick={() => HandleAddTask(setCardTasks, CardTasks)}>
            Add Task
          </Button>
        </Show>

        <h2 className="mt-5 text-lg">Description</h2>
        <Textarea maxLength={MAX_DESC} placeholder="Card Description(Optional)" value={CardDesc} onChange={(e) => setCardDesc(e.target.value.trim())} />

        <Show if={!!Message}>
          <span className=" text-destructive ">{Message}</span>
        </Show>

        <DialogFooter className="mt-5 flex flex-row justify-end w-full">
          <Button onClick={() => {}}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
