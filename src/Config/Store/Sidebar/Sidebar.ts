import { LOCALSTORAGE_GetItem } from "@/Middleware/LocalStorage";
import { createSlice } from "@reduxjs/toolkit";

export const SidebarSlice = createSlice({
  name: "Sidebar",
  initialState: LOCALSTORAGE_GetItem("Kanban-Sidebar") || "Opened",
  reducers: {
    Toggle: (state) => {
      return (state = state === "Opened" ? "Closed" : "Opened");
    },
    SetSidebar: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const { Toggle, SetSidebar } = SidebarSlice.actions;

export default SidebarSlice.reducer;
