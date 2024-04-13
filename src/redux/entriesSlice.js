import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  entries: [],
  selectedEntry: null,
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
  },
});

export const { refreshEntries, setSelectedEntry, resetSelectedEntry } =
  entriesSlice.actions;

export default entriesSlice.reducer;
