import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  entries: [],
  user: {},
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    refreshEntries(state, action) {
      state.entries = action.payload;
    },
  },
});

export const { toggleTheme, setUser, refreshEntries } = globalSlice.actions;
export default globalSlice.reducer;
