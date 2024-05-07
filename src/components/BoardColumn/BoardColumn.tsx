import Status from "../Status/Status";
import BoardCard from "../BoardCard/BoardCard";
import BoardAddCard from "../BoardAddCard/BoardAddCard";
import { useEffect, useState } from "react";
//@ts-ignore
import { Draggable, Droppable } from "react-beautiful-dnd";
//@ts-ignore
import { v4 as uuid } from "uuid";
import BoardColumnOptions from "./BoardColumnOptions";
import Tooltip from "../Tooltip/Tooltip";
import { useSelector } from "react-redux";
import { CardType, TagType } from "@/Data/Types";

type Props = {
  Column: any;
  ColumnIndex: number;
};

export default function BoardColumn({ Column, ColumnIndex }: Props) {
  const [Cards, setCards] = useState([...Column.Cards]);
  const CardWidth = useSelector((state: any) => state.CardWidth);
  const TagsToFilter = useSelector((state: any) => state.TagsFilter);
  const SearchFilter = useSelector((state: any) => state.SearchFilter);
  const Board = useSelector((state: any) => state.Board);
  const Translations = useSelector((state: any) => state.Translations);

  useEffect(() => {
    setCards(Column.Cards);
  }, [Column]);

  const FilterCards = (Card: CardType) => {
    var HasTag = false;
    var TextFitlter = false;
    var CardTitle = false;
    var CardDesc = false;
    var CardTags = false;

    if (!SearchFilter) {
      TextFitlter = true;
    } else {
      CardTitle = Card?.CardTitle.toLowerCase().includes(SearchFilter.toLowerCase());
      CardDesc = Card?.CardDescription.toLowerCase().includes(SearchFilter.toLowerCase());

      if (Card?.Tags?.length > 0) {
        Card.Tags.map((CardTag) => {
          let Tag: any = Board?.Tags?.find((BoardTag: TagType) => BoardTag.TagId === CardTag);
          if (Tag) {
            if (Tag?.TagName.toLowerCase().includes(SearchFilter.toLowerCase())) {
              CardTags = true;
            }
          }
        });
      } else {
        CardTags = false;
      }

      TextFitlter = CardTitle || CardDesc || CardTags;
    }

    //TAG FILTER
    if (Card?.Tags?.length > 0) {
      if (TagsToFilter.length > 0) {
        TagsToFilter?.forEach((TagToFilter: string) => {
          if (Card?.Tags?.indexOf(TagToFilter) !== -1) {
            HasTag = true;
          }
        });
      } else {
        HasTag = true;
      }
    } else {
      if (TagsToFilter.length > 0) {
        HasTag = false;
      } else {
        HasTag = true;
      }
    }

    return HasTag && TextFitlter;
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
                <BoardColumnOptions Column={Column} />
              </div>
            </div>

            <div className="flex flex-col gap-2 py-2">
              {Cards.filter(FilterCards).map((Card: any, CardIndex) => {
                return <BoardCard ColumnIndex={ColumnIndex} Column={Column} CardIndex={CardIndex} Card={Card} Index={CardIndex} key={uuid()} />;
              })}

              {provided.placeholder}

              <BoardAddCard ColumnIndex={ColumnIndex} />
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}
