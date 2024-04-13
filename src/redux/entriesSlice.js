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
  },
});

export const { refreshEntries } = entriesSlice.actions;

export default entriesSlice.reducer;
