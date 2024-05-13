import Status from "../Status/Status";
import BoardCard from "../BoardCard/BoardCard";
import BoardAddCard from "../BoardAddCard/BoardAddCard";
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import BoardColumnOptions from "./BoardColumnOptions";
import Tooltip from "../Tooltip/Tooltip";
import { useSelector } from "react-redux";
import { FilterCards } from "./BoardColumn.Utils";
import { CardType, ColumnType } from "@/Data/Types";

type BoardColumnProps = {
  Column: ColumnType;
  ColumnIndex: number;
};

export default function BoardColumn({ Column, ColumnIndex }: BoardColumnProps) {
  const [Cards, setCards] = useState([...Column.Cards]);
  const CardWidth = useSelector((state: any) => state.CardWidth);
  const TagsToFilter = useSelector((state: any) => state.TagsFilter);
  const SearchFilter = useSelector((state: any) => state.SearchFilter);
  const Board = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);

  useEffect(() => {
    setCards(Column.Cards);
  }, [Column]);

  const Filter = (Card: CardType) => {
    return FilterCards(Card, SearchFilter, Board, TagsToFilter);
  };

  return (
    <Droppable droppableId={Column.ColumId} key={Column.ColumId}>
      {(provided: any) => {
        return (
          <div className={`flex flex-col ${CardWidth} max-w-${CardWidth} flex-shrink-0 justify-start gap-4 px-3 py-4 rounded-xl bg-slate-400/10 dark:bg-slate-400/5 mr-2 `} {...provided.droppableProps} ref={provided.innerRef}>
            <div className="flex flex-row justify-between  items-center gap-3">
              <Status Color={Column.ColumnColor} Text={Column.ColumnTitle} Column={Column} />
              <div className="flex flex-row gap-5 items-center justify-end ">
                <Tooltip text={Translations.Tooltips.QtdCards}>
                  <span>{Column.CardsQtd}</span>
                </Tooltip>
                <BoardColumnOptions Column={Column} ColumnIndex={ColumnIndex} />
              </div>
            </div>

            <div className="flex flex-col gap-2 py-2">
              {Cards.filter(Filter).map((Card: any, CardIndex) => {
                return <BoardCard ColumnIndex={ColumnIndex} Column={Column} CardIndex={CardIndex} Card={Card} Index={CardIndex} key={uuid()} />;
              })}

              {provided.placeholder}

              {!SearchFilter && <BoardAddCard ColumnIndex={ColumnIndex} />}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}
