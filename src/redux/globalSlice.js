import { createSlice } from "@reduxjs/toolkit";

const initialState = { theme: "light" };

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = globalSlice.actions;
export default globalSlice.reducer;
