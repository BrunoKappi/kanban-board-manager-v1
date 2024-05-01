import { BoardType } from "@/Data/Types";

export const GetBoard = (BoardId: string) => {
  const Boards = JSON.parse(localStorage.getItem("Kanban-Boards") || "");

  const Board = Boards.find((Board:BoardType) => Board.BoardId === BoardId);

  return Board
};
