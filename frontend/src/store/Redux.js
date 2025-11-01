import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import eventReducer from "./EventSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});

export default store;
