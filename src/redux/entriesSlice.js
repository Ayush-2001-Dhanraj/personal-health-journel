import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [],
  selectedEntry: null,
  isLoading: true,
  searchTerm: "",
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
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  refreshEntries,
  setSelectedEntry,
  resetSelectedEntry,
  setIsLoading,
  setSearchTerm,
} = entriesSlice.actions;

export default entriesSlice.reducer;
