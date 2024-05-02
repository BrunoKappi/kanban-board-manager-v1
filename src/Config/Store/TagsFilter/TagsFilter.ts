import { createSlice } from "@reduxjs/toolkit";

export const TagsFilterSlice = createSlice({
  name: "TagsFilter",
  initialState: JSON.parse(localStorage.getItem("Kanban-TagsFilter") || "[]") || [],
  reducers: {
    //@ts-ignore
    SetTagsFilter: (state, action: any) => {
      //@ts-ignore
      return (state = [...action.payload]);
    },
  },
});

export const { SetTagsFilter } = TagsFilterSlice.actions;

export default TagsFilterSlice.reducer;
