import { LOCALSTORAGE_GetItem } from "@/Middleware/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

export const TagsFilterSlice = createSlice({
  name: "TagsFilter",
  initialState: JSON.parse(LOCALSTORAGE_GetItem("Kanban-TagsFilter") || "[]") || [],
  reducers: {
    SetTagsFilter: (state, action) => {
      return (state = [...action.payload]);
    },
  },
});

export const { SetTagsFilter } = TagsFilterSlice.actions;

export default TagsFilterSlice.reducer;
