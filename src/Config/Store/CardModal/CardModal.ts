import { createSlice } from "@reduxjs/toolkit";

export const CardModalSlice = createSlice({
  name: "CardModal",
  initialState: {
    Mode: "",
    ColumnIndex: 0,
    CardIndex: 0,
    Card: {},
  },
  reducers: {
    SetCardModal: (state, action: any) => {
      return (state = { ...action.payload });
    },

    SetCardModalMode: (state, action) => {
      const value = action.payload;
      state.Mode = value; // action.payload.username
    },
    SetCardModalCard: (state, action: any) => {
      const value = action.payload;
      state.Card = { ...value };
    },
    SetCardModalCardTags: (state, action: any) => {
      const value = action.payload;
      //@ts-ignore
      state.Card = { ...state.Card, Tags: [...value] };
    },
    SetCardModalCardTitle: (state, action: any) => {
      const value = action.payload;
      //@ts-ignore
      state.Card = { ...state.Card, CardTitle: value };
    },
    SetCardModalColumnIndex: (state, action: any) => {
      const value = action.payload;
      state.ColumnIndex = value;
    },
    SetCardModalCardIndex: (state, action: any) => {
      const value = action.payload;
      state.CardIndex = value;
    },
  },
});

export const { SetCardModal, SetCardModalMode, SetCardModalCard, SetCardModalColumnIndex, SetCardModalCardIndex, SetCardModalCardTags, SetCardModalCardTitle } = CardModalSlice.actions;

export default CardModalSlice.reducer;
