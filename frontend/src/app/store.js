import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice.js";
// import searchReducer from "./features/authSlice.js";
import studentReducer from "./features/studentSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // search: searchReducer,
    students: studentReducer,
  },
});

export default store;
