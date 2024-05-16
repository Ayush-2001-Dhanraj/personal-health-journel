import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [],
  selectedEntry: null,
  isLoading: true,
};

const entriesSlice = createSlice({
  name: "entries",
  initialState,
  reducers: {
    refreshEntries(state, action) {
      state.entries = action.payload;
    },
    setSelectedEntry(state, action) {
      state.selectedEntry = action.payload;
    },
    resetSelectedEntry(state, action) {
      state.selectedEntry = null;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  refreshEntries,
  setSelectedEntry,
  resetSelectedEntry,
  setIsLoading,
} = entriesSlice.actions;

export default entriesSlice.reducer;
