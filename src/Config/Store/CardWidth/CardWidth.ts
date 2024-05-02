import { createSlice } from "@reduxjs/toolkit";

export const CardWidthSlice = createSlice({
  name: "CardWidth",
  initialState: localStorage.getItem("Kanban-CardWidth") || "w-64",
  reducers: {
    SetCardWidth: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetCardWidth } = CardWidthSlice.actions;

export default CardWidthSlice.reducer;
