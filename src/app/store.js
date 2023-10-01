import { configureStore } from "@reduxjs/toolkit";
import asinSlice from "../reducers/generalAsin";

export default configureStore({
  reducer: {
    asin: asinSlice,
  },
});
