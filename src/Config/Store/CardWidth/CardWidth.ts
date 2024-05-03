import { CardSizes } from "@/Data/Sizes";
import { createSlice } from "@reduxjs/toolkit";

const GetInitialWidth = () => {
  if (window.innerWidth >= 1536) {
    return CardSizes[3].Size;
  } else if (window.innerWidth >= 1280) {
    return CardSizes[2].Size;
  } else if (window.innerWidth >= 768) {
    return CardSizes[1].Size;
  } else {
    return CardSizes[0].Size;
  }
};

export const CardWidthSlice = createSlice({
  name: "CardWidth",
  initialState: localStorage.getItem("Kanban-CardWidth") || GetInitialWidth(),
  reducers: {
    SetCardWidth: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetCardWidth } = CardWidthSlice.actions;

export default CardWidthSlice.reducer;
