import { Boards } from "@/Data/Boards";

import { createSlice } from "@reduxjs/toolkit";

import moment from "moment";

const InitialState = [...Boards];

export const GetInitialState = () => {
  if (localStorage.getItem("Kanban-Boards")) {
    const BoardsLocal = JSON.parse(localStorage.getItem("Kanban-Boards") || "");
    return BoardsLocal?.length > 0 ? BoardsLocal : InitialState;
  } else {
    return InitialState;
  }
};

export const BoardsSlice = createSlice({
  name: "Boards",
  initialState: GetInitialState(),
  reducers: {
    SetBoards: (state, action: any) => {
      return (state = [...action.payload]);
    },
    EditBoardColumns: (state, action) => {
      const { BoardId, BoardColumns } = action.payload;

      const boardIndex = state.findIndex((board: any) => board.BoardId === BoardId);

      if (boardIndex !== -1) {
        state[boardIndex].Columns = [...BoardColumns];
        state[boardIndex].LastEditedAt = moment().valueOf();
      }
    },
    EditBoardName: (state, action) => {
      const { BoardId, BoardName } = action.payload;

      const boardIndex = state.findIndex((board: any) => board.BoardId === BoardId);

      if (boardIndex !== -1) {
        state[boardIndex].BoardName = BoardName;
        state[boardIndex].LastEditedAt = moment().valueOf();
      }
    },
  },
});

export const { SetBoards, EditBoardColumns, EditBoardName } = BoardsSlice.actions;

export default BoardsSlice.reducer;
