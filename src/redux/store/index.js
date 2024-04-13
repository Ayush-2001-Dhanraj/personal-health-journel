import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../globalSlice";
import userSlice from "../userSlice";
import entriesSlice from "../entriesSlice";

const store = configureStore({
  reducer: { global: globalSlice, user: userSlice, entries: entriesSlice },
});

export default store;
