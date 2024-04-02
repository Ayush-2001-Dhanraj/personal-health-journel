import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "../redux/globalSlice";

const store = configureStore({ reducer: { global: globalSlice } });

export default store;
