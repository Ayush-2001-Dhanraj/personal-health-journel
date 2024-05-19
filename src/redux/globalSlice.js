import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  isAddModelOpen: false,
  isViewModelOpen: false,
  isAttachmentModelOpen: false,
  isLoading: true,
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
    closeAttachmentModel(state) {
      state.isAttachmentModelOpen = false;
    },
    openAttachmentModel(state) {
      state.isAttachmentModelOpen = true;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  toggleTheme,
  closeAddModel,
  openAddModel,
  closeViewModel,
  openViewModel,
  closeAttachmentModel,
  openAttachmentModel,
  setIsLoading,
} = globalSlice.actions;
export default globalSlice.reducer;
