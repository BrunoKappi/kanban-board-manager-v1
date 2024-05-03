import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { MinimalInput } from "../ui/minimalInput";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { Checkbox } from "../ui/checkbox";
import Tooltip from "../Tooltip/Tooltip";
import { Columns2, GripVertical, ListChecks, NotebookPen, PencilLine, Tag, Trash2 } from "lucide-react";
import { ColumnType, TagType, TaskType } from "@/Data/Types";
import { HandleAddTask, HandleChangeCardColumn, HandleChangeCardDesc, HandleChangeCardNotes, HandleChangeCardTitle, HandleChangeTaskTitle, HandleCreateCard, HandleDeleteTask, HandleDragTasks, HandleSaveTasks, HandleToggleTask, SetCardModalTitle } from "./CardModal.Utils";
import { Button } from "../ui/button";
import Show from "@/lib/Show";
import { Textarea } from "../ui/textarea";
import { MinimalTextarea } from "../ui/minimalTextarea";
import DeleteCard from "./DeleteCard";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { colors } from "@/Data/Colors";
import TagInput from "./TagInput";
import { HandleCardTagToggle } from "./TagInput.Utils";
import { MAX_CARD_TITLE, MAX_DESC, MAX_TASK_TITLE } from "@/Data/Limits";
import { useDispatch } from "react-redux";
import { SetCardModalCard } from "@/Config/Store/CardModal/CardModal";

type Props = {};

const CardModal = ({}: Props) => {
  const dispatch = useDispatch();
  const textareaRef = useRef(null);
  const NotesTextarea = useRef(null);
  const TitleTextarea = useRef(null);
  const CardModal = useSelector((state: any) => state.CardModal);
  const Board = useSelector((state: any) => state.Board);
  const [CardTile, setCardTile] = useState("");
  const [CardTasks, setCardTasks] = useState([...(CardModal?.Card?.Tasks || [])]);
  const [CardDesc, setCardDesc] = useState("");
  const [CardNotes, setCardNotes] = useState("");
  const [Message, setMessage] = useState("");
  const [FocusWhat, setFocusWhat] = useState("");
  const [ColumnId, setColumnId] = useState("");
  const [BoardTags, setBoardTags] = useState([]);
  const [FocusOn, setFocusOn] = useState(0);
  const [open, setOpen] = useState(false);
  const [CanSave, setCanSave] = useState(false);
  const [Reorder] = useState(false);

  const HandleDialogChange = (State: boolean) => {
    setOpen(State);
    if (!State) {
      setCardTile("");
      setCardDesc("");
      setCardNotes("");
      setCardTasks([]);
      setColumnId("");
      setCanSave(false);
      setFocusOn(0);
      setFocusWhat("");
      setMessage("");
      //@ts-ignore
      dispatch(SetCardModalCard({}));
    }
  };

  useEffect(() => {
    if (!!CardModal.Card.CardId) setOpen(true);
    if (!CardTile) setCardTile(CardModal.Card?.CardTitle || "");
    if (!CardDesc) setCardDesc(CardModal.Card?.CardDescription || "");
    if (!CardNotes) setCardNotes(CardModal.Card?.CardNotes || "");

    if (CardTasks.length === 0) setCardTasks([...(CardModal.Card?.Tasks || [])]);

    if (!!Board?.BoardId) {
      Board?.Columns?.forEach((Column: ColumnType, Index: number) => {
        if (Index === CardModal.ColumnIndex) {
          setColumnId(Column.ColumId);
        }
      });
    }

    setBoardTags(Board?.Tags);
  }, [CardModal, Board?.Tags]);

  const HandleInputHeight = (ref: any, state: any, defaultHeight: string) => {
    if (ref.current) {
      //@ts-ignore
      ref.current.style.height = `${ref.current.scrollHeight}px`;
      if (!state && defaultHeight)
        //@ts-ignore
        ref.current.style.height = defaultHeight;
    }
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      if (CardTasks.length > 0 && CanSave) {
        HandleSaveTasks(CardTasks);
      }
      if (CanSave) HandleChangeCardTitle(CardTile.trim());
      if (CanSave) HandleChangeCardDesc(CardDesc.trim());
      if (CanSave) HandleChangeCardNotes(CardNotes.trim());

      HandleInputHeight(TitleTextarea, CardTile, "");
      HandleInputHeight(NotesTextarea, CardNotes, "30px");
      HandleInputHeight(textareaRef, CardDesc, "30px");
    }, 500);

    return () => clearTimeout(delayInputTimeoutId);
  }, [CardTasks, CardDesc, CardTile, CardNotes]);

  useEffect(() => {
    HandleInputHeight(TitleTextarea, CardTile, "");
    HandleInputHeight(NotesTextarea, CardNotes, "30px");
    HandleInputHeight(textareaRef, CardDesc, "30px");
  }, [CardTile, CardNotes, CardDesc]);

  return (
    <Dialog open={open} onOpenChange={HandleDialogChange}>
      <DialogContent className="px-10 sm:max-w-[450px] md:max-w-[700px] max-h-[90dvh] overflow-y-scroll bg-background dark:bg-background-dark-dialog border dark:border-border-dark  ">
        <div className="flex flex-col items-stretch justify-stretch gap-2">
          <MinimalTextarea
            ref={TitleTextarea}
            className=" flex-shrink-0 resize-none text-2xl border-none  max-w-full overflow-hidden"
            placeholder="Card Title"
            autoFocus={false}
            maxLength={MAX_CARD_TITLE}
            value={CardTile}
            onChange={(e) => {
              setCanSave(true);
              setFocusWhat("Title");
              SetCardModalTitle(e.target.value);
              setCardTile(e.target.value);
            }}
          />

          <h2 className="mt-5 text-lg flex  bg-slate-400/10 dark:bg-slate-400/5  flex-row gap-2 items-center w-full py-0.5 px-1 rounded-md">
            <Tag className="size-5" />
            Tags
          </h2>
          <div className="flex flex-row items-center flex-wrap gap-2 overflow-x-hidden max-w-full flex-shrink-0">
            {CardModal.Card.Tags?.map((TagId: string) => {
              const Tag: any = BoardTags?.find((BoardTag: TagType) => BoardTag.TagId === TagId);
              return Tag ? (
                <span className={`${colors[Tag?.TagColor]?.bg} ${colors[Tag?.TagColor]?.text} text-xs px-2 rounded-sm truncate flex-shrink-0 flex flex-row gap-1 items-center`}>
                  <span>{Tag?.TagName}</span>
                  <span
                    className=" hover:bg-overlay cursor-pointer px-1"
                    onClick={() => {
                      HandleCardTagToggle(Tag);
                    }}
                  >
                    x
                  </span>
                </span>
              ) : (
                ""
              );
            })}

            <TagInput />
          </div>

          <Show if={CardModal.Mode === "View"}>
            <h2 className="mt-5 text-lg flex  bg-slate-400/10 dark:bg-slate-400/5 flex-row gap-2 items-center w-full py-0.5 px-1 rounded-md">
              <Columns2 className="size-5" />
              Group
            </h2>
            <Select
              onValueChange={(Value) => {
                HandleChangeCardColumn(Value);
                setOpen(false);
              }}
              defaultValue={ColumnId}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup defaultValue={"Todo2"}>
                  <SelectLabel>Groups</SelectLabel>
                  {Board?.Columns?.map((Column: ColumnType) => {
                    return (
                      <SelectItem textValue={Column.ColumnTitle} value={Column.ColumId}>
                        {Column.ColumnTitle}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Show>

          <h2 className="mt-5 text-lg flex  bg-slate-400/10 dark:bg-slate-400/5 flex-row gap-2 items-center w-full py-0.5 px-1 rounded-md">
            <ListChecks className="size-5" />
            Tasks
          </h2>
          <DragDropContext onDragEnd={(Result) => HandleDragTasks(Result, CardTasks, setCardTasks)}>
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
                                  maxLength={MAX_TASK_TITLE}
                                  placeholder="Task"
                                  autoFocus={Index === FocusOn && FocusWhat === "Tasks"}
                                  key={v4()}
                                  className={`"m-0 py-0 px-0 h-auto ${Task.Completed && "line-through"}`}
                                  value={Task.TaskTitle}
                                  onChange={(e) => {
                                    setCanSave(true);
                                    setFocusWhat("Tasks");
                                    setFocusOn(Index);
                                    HandleChangeTaskTitle(e.target.value, Index, setCardTasks, CardTasks);
                                  }}
                                />
                                <Tooltip text="Delete Task">
                                  <Trash2
                                    className="h-4 mr-3"
                                    onClick={() => {
                                      HandleDeleteTask(Index, setCardTasks, CardTasks);
                                    }}
                                  />
                                </Tooltip>
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

          <h2 className="mt-5 text-lg flex  bg-slate-400/10 dark:bg-slate-400/5 flex-row gap-2 items-center w-full py-0.5 px-1 rounded-md">
            <PencilLine className="size-5" />
            Description
          </h2>

          <Textarea
            maxLength={MAX_DESC}
            ref={textareaRef}
            className=" resize-none border overflow-hidden border-background dark:border-background-dark-dialog ring-0 shadow-none focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 px-0"
            value={CardDesc}
            onChange={(e) => {
              setCanSave(true);
              setFocusWhat("Desc");
              setCardDesc(e.target.value);
            }}
          />

          <h2 className="mt-5 text-lg flex  bg-slate-400/10 dark:bg-slate-400/5 flex-row gap-2 items-center w-full py-0.5 px-1 rounded-md">
            <NotebookPen className="size-5" />
            Notes
          </h2>

          <Textarea
            maxLength={MAX_DESC}
            ref={NotesTextarea}
            className=" resize-none border overflow-hidden border-background dark:border-background-dark-dialog ring-0 shadow-none focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 px-0"
            value={CardNotes}
            onChange={(e) => {
              setCanSave(true);
              setFocusWhat("Desc");
              setCardNotes(e.target.value);
            }}
          />

          <Show if={!!Message}>
            <span className=" text-destructive ">{Message}</span>
          </Show>

          <Show if={CardModal.Mode === "Add"}>
            <DialogFooter className="mt-5 flex flex-row justify-end w-full">
              <Button
                onClick={() => {
                  HandleCreateCard(CardTile, CardDesc, CardTasks, setOpen, setMessage);
                }}
              >
                Add Card
              </Button>
            </DialogFooter>
          </Show>

          <DeleteCard setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
