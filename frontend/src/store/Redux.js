import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import eventReducer from "./EventSlice";
import swapReducer from "./SwapSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    swaps: swapReducer,
  },
});

export default store;
