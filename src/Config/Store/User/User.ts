import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
  docID: string;
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  loading: boolean;
};

const InitialState: UserType = {
  displayName: "",
  docID: "",
  email: "",
  uid: "",
  photoURL: "",
  loading: false,
};

export const UserSlice = createSlice({
  name: "User",
  initialState: InitialState,
  reducers: {
    SetUser: (state, action: any) => {
      state.email = action.payload?.email || "";
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
