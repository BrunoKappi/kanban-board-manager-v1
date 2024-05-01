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

type Props = {
  Column: any;
  ColumIndex: number;
};

export default function BoardColumn({ Column, ColumIndex }: Props) {
  const [Cards, setCards] = useState([...Column.Cards]);

  useEffect(() => {
    setCards(Column.Cards);
  }, [Column]);

  return (
    <Droppable droppableId={Column.ColumId} key={Column.ColumId}>
      {(provided: any) => {
        return (
          <div className={`flex flex-col  justify-start items-start gap-4 px-3 py-4 rounded-xl bg-slate-400/10 dark:bg-slate-400/5 mr-2 `} {...provided.droppableProps} ref={provided.innerRef}>
            <div className="flex flex-row justify-between w-full items-center">
              <Status Color={Column.ColumnColor} Text={Column.ColumnTitle} Column={Column} />
              <div className="flex flex-row gap-5 items-center">
                <Tooltip text="Qtd of Cards">
                  <span>{Column.CardsQtd}</span>
                </Tooltip>
                <BoardColumnOptions Column={Column} />
              </div>
            </div>

            <div className="flex flex-col gap-2 py-2">
              {Cards.map((Card: any, CardIndex) => {
                return <BoardCard ColumIndex={ColumIndex} CardIndex={CardIndex} Card={Card} Index={CardIndex} key={uuid()} />;
              })}

              {provided.placeholder}

              <BoardAddCard ColumIndex={ColumIndex} />
            </div>
          </div>
        );
      }}
    </Droppable>
  );
}
