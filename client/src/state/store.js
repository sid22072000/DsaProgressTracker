import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import sheetReducer from "./sheet/slice";
import progressReducer from "./progress/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    sheet: sheetReducer,
    progress: progressReducer,
  },
});

export default store;
