import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  isAddModelOpen: false,
  isViewModelOpen: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    closeAddModel(state) {
      state.isAddModelOpen = false;
    },
    openAddModel(state) {
      state.isAddModelOpen = true;
    },
    closeViewModel(state) {
      state.isViewModelOpen = false;
    },
    openViewModel(state) {
      state.isViewModelOpen = true;
    },
  },
});

export const {
  toggleTheme,
  closeAddModel,
  openAddModel,
  closeViewModel,
  openViewModel,
} = globalSlice.actions;
export default globalSlice.reducer;
