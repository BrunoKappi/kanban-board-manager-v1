import { LOCALSTORAGE_GetItem } from "@/Middleware/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

export const SearchFilterSlice = createSlice({
  name: "SearchFilter",
  initialState: LOCALSTORAGE_GetItem("Kanban-SearchFilter") || "",
  reducers: {
    SetSearchFilter: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { SetSearchFilter } = SearchFilterSlice.actions;

export default SearchFilterSlice.reducer;
