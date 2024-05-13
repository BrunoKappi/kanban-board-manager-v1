import { Draggable } from "react-beautiful-dnd";
import BoardCardOptions from "./BoardCardOptions";
import { useSelector } from "react-redux";
import { CardType, ColumnType, TagType, TaskType } from "@/Data/Types";
import { colors } from "@/Data/Colors";
import { Checkbox } from "../ui/checkbox";
import { HandleToggleTask } from "./BoardCard.Utils";
import { STORE_SetCardModal } from "@/Middleware/Store";

type BoardCardProps = {
  Card: CardType;
  Index: number;
  CardIndex: number;
  ColumnIndex: number;
  Column: ColumnType;
};

export default function BoardCard({ Card, Index, ColumnIndex, CardIndex, Column }: BoardCardProps) {
  const Board = useSelector((state: any) => state.Board);

  const HandleSelectCard = () => {
    var NewColumnIndex = ColumnIndex;

    Board?.Columns?.forEach((element: ColumnType, index: number) => {
      if (element.ColumId === Column.ColumId) NewColumnIndex = index;
    });

    STORE_SetCardModal("View", CardIndex, NewColumnIndex, Card);
  };

  return (
    <Draggable key={Card.CardId} draggableId={Card.CardId} index={Index}>
      {(DragProvided: any, Snapshot) => {
        return (
          <div className={`group w-full relative   px-3 border line-clamp-2  text-card-foreground gap-2 flex flex-col items-start border-slate-200 bg-white  py-2    rounded-md shadow-md hover:text-primary min-h-16 cursor-pointer ${Snapshot.isDragging ? " dark:bg-overlay-dark" : " dark:bg-overlay-dark"} dark:border-overlay-dark dark:text-primary-foreground flex-shrink`} onClick={HandleSelectCard} ref={DragProvided.innerRef} style={DragProvided.draggableProps.style} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
            <div className="flex flex-row flex-wrap gap-1 justify-start  gap-y-2 overflow-x-hidden flex-shrink overflow-clip">
              {Card.Tags?.map((TagId: string) => {
                let Tag: TagType = Board?.Tags?.find((BoardTag: TagType) => BoardTag.TagId === TagId);
                return Tag && <span className={`${colors[Tag?.TagColor]?.bg} ${colors[Tag?.TagColor]?.text} cursor-pointer max-w-36 text-xs px-2 rounded-sm truncate flex-shrink-0 flex flex-row gap-1 items-center`}>{Tag?.TagName}</span>;
              })}
            </div>
            <span className=" group line-clamp-2 select-none text-sm">{Card.CardTitle}</span>
            {Card.ShowTasksOnCard && (
              <div className="flex flex-col gap-1 cursor-pointer max-w-full">
                {Card.Tasks.map((Task: TaskType, Index: number) => {
                  if (Task.Completed) return;
                  return (
                    <div className="flex flex-row items-center justify-start gap-1.5 max-w-full">
                      <Checkbox
                        className="size-3 h-3 w-3"
                        checked={Task.Completed}
                        onClick={(e) => {
                          e.stopPropagation();
                          HandleToggleTask(Index, CardIndex, ColumnIndex);
                        }}
                      />
                      <span className="text-xs truncate">{Task.TaskTitle}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <BoardCardOptions Card={Card} CardIndex={CardIndex} ColumnIndex={ColumnIndex} Column={Column} />
          </div>
        );
      }}
    </Draggable>
  );
}
