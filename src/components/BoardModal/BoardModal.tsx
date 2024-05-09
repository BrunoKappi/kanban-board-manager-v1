import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Columns2, GripVertical, Pencil, PencilLine, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MinimalInput } from "../ui/minimalInput";
import ColorPicker from "../ColorPicker/ColorPicker";
import { Button } from "../ui/button";
import { HandleAddColumn, HandleColumnColor, HandleColumnTitle, HandleDeleteColumn, HandleDragColumns, HandleEditBoard } from "./AddBoardItem.Utils";
import { Textarea } from "../ui/textarea";
import Tooltip from "../Tooltip/Tooltip";
import Show from "@/lib/Show";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import { ListOption } from "../ListOption/ListOption";
import { useSelector } from "react-redux";
import { MAX_BOARD_TITLE, MAX_COLUMN_TITLE, MAX_DESC } from "@/Data/Limits";
import { FIREBASE_GetUser } from "@/Config/Firebase/Firestore";

type Props = {
  SetExternalOpen: (state: boolean) => void;
};

export function BoardModal({ SetExternalOpen }: Props) {
  const textareaRef = useRef(null);
  const Board = useSelector((state: any) => state.Board);
  const [open, setOpen] = useState(false);
  const [FocusOn, setFocusOn] = useState(0);
  const [FocusWhat, setFocusWhat] = useState("");
  const [OwnerEmail, setOwnerEmail] = useState("");
  const [Reorder] = useState(false);
  const [BoardName, setBoardName] = useState(Board?.BoardName);
  const [BoardDesc, setBoardDesc] = useState(Board?.BoardDesc);
  const [Message, setMessage] = useState("");
  const [BoardColumns, setBoardColumns] = useState([...(Board?.Columns || [])]);
  const Translations = useSelector((state: any) => state.Translations);
  const IsBoardOwner = useSelector((state: any) => state.IsBoardOwner);

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
    if (!IsBoardOwner) {
      FIREBASE_GetUser(Board.OwnerUid).then((UsersFound) => {
        //@ts-ignore
        setOwnerEmail(Translations.Text.SharedBy + " " + UsersFound[0].Email);
      });
    }
  }, [IsBoardOwner]);

  HandleInputHeight(textareaRef, BoardDesc, "30px");

  const HandleModal = (state: boolean) => {
    setOpen(state);
    if (state === false) {
      HandleEditBoard(BoardName, BoardColumns, BoardDesc, setMessage, Board);
    }
  };

  return (
    <Dialog open={open} onOpenChange={HandleModal}>
      <DialogTrigger asChild>
        <ListOption>
          <Pencil className="size-4" />
          {Translations.BoardModal.Title}
        </ListOption>
      </DialogTrigger>
      <DialogContent className="md:px-14 sm:max-w-[450px] md:max-w-[700px] max-h-[90dvh] overflow-y-scroll bg-background dark:bg-background-dark-dialog border dark:border-border-dark ">
        {!IsBoardOwner && (
          <div>
            <span className="text-xs bg-overlay dark:bg-blue-800/20 px-2 py-0.5 rounded-full">{OwnerEmail}</span>
          </div>
        )}

        <MinimalInput
          autoFocus={false}
          maxLength={MAX_BOARD_TITLE}
          className=" flex-shrink-0 line-clamp-2 resize-none text-2xl border-none break-words max-w-full overflow-wrap-normalver"
          placeholder={Translations.Placeholders.BoardName}
          value={BoardName}
          onChange={(e) => {
            if (IsBoardOwner) {
              setFocusWhat("BoardName");
              setBoardName(e.target.value);
            }
          }}
        />

        <h2 className="mt-5 text-lg flex flex-row gap-2 items-center w-full bg-overlay dark:bg-overlay-dark py-0.5 px-1 rounded-md">
          <PencilLine className="size-5" />
          {Translations.ModalHeaders.BoardDesc}
        </h2>

        <Textarea
          maxLength={MAX_DESC}
          ref={textareaRef}
          className=" resize-none border overflow-hidden border-background dark:border-background-dark-dialog ring-0 shadow-none focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 px-0"
          value={BoardDesc}
          onChange={(e) => {
            setFocusWhat("BoardDesc");
            setBoardDesc(e.target.value);
          }}
        />
        <div className="flex flex-row gap-2 items-center mt-5 justify-between w-full">
          <h2 className="mt-5 text-lg flex flex-row gap-2 items-center w-full bg-overlay dark:bg-overlay-dark py-0.5 px-1 rounded-md">
            <Columns2 className="size-5" />
            {Translations.ModalHeaders.BoardColumns}
          </h2>
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
                                  <Tooltip text={Translations.Tooltips.GrabColumn}>
                                    <GripVertical className="h-5" />
                                  </Tooltip>
                                  <MinimalInput
                                    maxLength={MAX_COLUMN_TITLE}
                                    autoFocus={ColumnIndex === FocusOn && FocusWhat === "BoardColumn"}
                                    placeholder={Translations.Placeholders.BoardColumn}
                                    value={BoardColumn.ColumnTitle}
                                    onChange={(e) => {
                                      setFocusWhat("BoardColumn");
                                      setFocusOn(ColumnIndex);
                                      HandleColumnTitle(e.target.value, ColumnIndex, setBoardColumns, BoardColumns);
                                    }}
                                    className="flex-grow"
                                  />
                                </div>
                                <ColorPicker onSelect={(Value: any) => HandleColumnColor(Value, ColumnIndex, setBoardColumns, BoardColumns)} color={BoardColumn.ColumnColor} />

                                <Tooltip text={Translations.Tooltips.DeleteColumn}>
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
                  <MinimalInput maxLength={MAX_COLUMN_TITLE} placeholder={Translations.Placeholders.BoardColumn} value={BoardColumn.ColumnTitle} onChange={(e) => HandleColumnTitle(e.target.value, ColumnIndex, setBoardColumns, BoardColumns)} className="flex-grow" />
                </div>

                <ColorPicker onSelect={(Value: any) => HandleColumnColor(Value, ColumnIndex, setBoardColumns, BoardColumns)} color={BoardColumn.ColumnColor} />

                <Tooltip text={Translations.Tooltips.DeleteColumn}>
                  <Trash2 className="size-5 cursor-pointer" onClick={() => HandleDeleteColumn(ColumnIndex, setBoardColumns, BoardColumns)} />
                </Tooltip>
              </span>
            );
          })}
        </Show>

        <Show if={!Reorder}>
          <Button variant="outline" onClick={() => HandleAddColumn(setBoardColumns, BoardColumns)}>
            {Translations.Buttons.AddColumn}
          </Button>
        </Show>
        <Show if={!!Message}>
          <span className=" text-destructive ">{Message}</span>
        </Show>

        <DialogFooter className="mt-5 flex flex-row justify-end w-full">
          <Button
            onClick={() => {
              if (!BoardName) {
                setMessage(Translations.BoardModal.ErrorTitle);
                setTimeout(() => {
                  setMessage("");
                }, 3000);
                return;
              }
              if (BoardColumns.length === 0) {
                setMessage(Translations.BoardModal.ErrorColumns);
                setTimeout(() => {
                  setMessage("");
                }, 3000);
                return;
              }
              SetExternalOpen(false);
              HandleEditBoard(BoardName, BoardColumns, BoardDesc, setMessage, Board);
            }}
          >
            {Translations.Buttons.SaveChanges}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
