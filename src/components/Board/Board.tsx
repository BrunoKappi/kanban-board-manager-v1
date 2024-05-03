import BoardColumn from "../BoardColumn/BoardColumn";
import BoardAddColumn from "../BoardAddColumn/BoardAddColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { HandleDrag } from "./Board.Utils";
import Show from "@/lib/Show";
import { BoardProps } from "./Board.Types";
import Status from "../Status/Status";
import BoardImage from "@/Assets/Board.svg";
import BoardColumnOptions from "../BoardColumn/BoardColumnOptions";
import Tooltip from "../Tooltip/Tooltip";
import CardModal from "../CardModal/CardModal";
import { AddBoardItem } from "../Sidebar/AddBoardItem";

export const Board = ({ Board }: BoardProps) => {
  return (
    <div className="flex-grow  h-full flex flex-row items-start justify-start scroll px-4 pt-10 pb-5 pl-10 overflow-x-auto">
      <CardModal />
      <Show if={Board?.BoardId !== ""}>
        <DragDropContext
          onDragEnd={(result) => {
            HandleDrag(result, Board);
          }}
        >
          <Show if={!!Board.BoardId}>
            {Board?.Columns?.filter((Colum) => Colum.Visible).map((Column: any, ColumnIndex) => (
              <BoardColumn Column={Column} ColumnIndex={ColumnIndex} />
            ))}
          </Show>
        </DragDropContext>

        <div className="flex flex-col justify-start gap-2 ml-5">
          <Show if={!!Board.BoardId}>
            <BoardAddColumn />
          </Show>

          <div className="">
            <Show if={Board?.Columns?.filter((Colum) => !Colum.Visible).length > 0}>
              <h1 className="mt-5 mb-2 ">Hidden Columns</h1>
            </Show>

            <div className="flex flex-col gap-0">
              <Show if={!!Board.BoardId}>
                {Board?.Columns?.filter((Colum) => !Colum.Visible).map((Column: any) => (
                  <div className="flex flex-row justify-between w-full gap-3 items-center">
                    <Status Color={Column.ColumnColor} Text={Column.ColumnTitle} Column={Column} />
                    <div className="flex flex-row gap-5 items-center">
                      <Tooltip text="Qtd of Cards">
                        <span>{Column.CardsQtd}</span>
                      </Tooltip>
                      <BoardColumnOptions Column={Column} />
                    </div>
                  </div>
                ))}
              </Show>
            </div>
          </div>
        </div>
      </Show>

      <Show if={!Board.BoardId}>
        <div className="w-full text-center font-semibold text-2xl flex flex-col justify-center items-center gap-7">
          <h1 className=" text-4xl font-semibold">No Boards Yet</h1>
          <img src={BoardImage} alt="" className="size-[80%] md:size-[50%] max-w-96" />
          <AddBoardItem className="rounded-full w-auto" />
        </div>
      </Show>
    </div>
  );
};
