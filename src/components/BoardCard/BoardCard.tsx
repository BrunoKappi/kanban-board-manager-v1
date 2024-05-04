import { SetCardModalCard, SetCardModalCardIndex, SetCardModalColumnIndex, SetCardModalMode } from "@/Config/Store/CardModal/CardModal";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import BoardCardOptions from "./BoardCardOptions";
import { useSelector } from "react-redux";
import { TagType } from "@/Data/Types";
import { colors } from "@/Data/Colors";

type Props = {
  Card: any;
  Index: number;
  CardIndex: number;
  ColumnIndex: number;
  Column: any;
};

export default function BoardCard({ Card, Index, ColumnIndex, CardIndex, Column }: Props) {
  const Board = useSelector((state: any) => state.Board);
  const dispatch = useDispatch();

  const HandleSelectCard = () => {
    var NewColumnIndex = ColumnIndex;

    Board?.Columns?.forEach((element: any, index: number) => {
      if (element.ColumId === Column.ColumId) NewColumnIndex = index;
    });

    //@ts-ignore
    dispatch(SetCardModalMode("View"));
    //@ts-ignore
    dispatch(SetCardModalCardIndex(CardIndex));
    //@ts-ignore
    dispatch(SetCardModalColumnIndex(NewColumnIndex));
    //@ts-ignore
    dispatch(SetCardModalCard(Card));
  };

  return (
    <Draggable key={Card.CardId} draggableId={Card.CardId} index={Index}>
      {(DragProvided: any, Snapshot) => {
        return (
          <div className={`group w-full relative   px-3 border line-clamp-2  text-card-foreground gap-2 flex flex-col items-start border-slate-200 bg-white  py-2    rounded-md shadow-md hover:text-primary min-h-16 cursor-pointer ${Snapshot.isDragging ? " dark:bg-overlay-dark" : " dark:bg-overlay-dark"} dark:border-overlay-dark dark:text-primary-foreground flex-shrink`} onClick={HandleSelectCard} ref={DragProvided.innerRef} style={DragProvided.draggableProps.style} {...DragProvided.draggableProps} {...DragProvided.dragHandleProps}>
            <div className="flex flex-row flex-wrap gap-1  gap-y-2 overflow-x-hidden flex-shrink">
              {Card.Tags?.map((TagId: string) => {
                let Tag: any = Board?.Tags?.find((BoardTag: TagType) => BoardTag.TagId === TagId);
                return <span className={`${colors[Tag?.TagColor]?.bg} ${colors[Tag?.TagColor]?.text} cursor-pointer max-w-36 text-xs px-2 rounded-sm truncate flex-shrink-0 flex flex-row gap-1 items-center`}>{Tag?.TagName}</span>;
              })}
            </div>
            <span className=" group line-clamp-2 select-none text-sm">{Card.CardTitle}</span>
            <BoardCardOptions Card={Card} CardIndex={CardIndex} ColumnIndex={ColumnIndex} Column={Column} />
          </div>
        );
      }}
    </Draggable>
  );
}
