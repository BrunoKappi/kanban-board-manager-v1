import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  docID: string;
  uid: string;
  Email: string;
  photoURL: string;
  displayName: string;
  loading: boolean;
  CreatedAt: number;
  LastEditedAt: number;
};

const InitialState: UserType = {
  displayName: "",
  docID: "",
  Email: "",
  uid: "",
  photoURL: "",
  loading: false,
  CreatedAt: 0,
  LastEditedAt: 0,
};

export const UserSlice = createSlice({
  name: "User",
  initialState: InitialState,
  reducers: {
    SetUser: (state, action) => {
      state.Email = action.payload?.Email || "";
      state.displayName = action.payload?.displayName || "";
      state.docID = action.payload?.docID || "";
      state.uid = action.payload?.uid || "";
      state.photoURL = action.payload?.photoURL || "";
      state.loading = action.payload?.loading || false;
    },
    SetLoading: (state) => {
      state.loading = true;
    },
    UnsetLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { SetUser, SetLoading, UnsetLoading } = UserSlice.actions;

export default UserSlice.reducer;
