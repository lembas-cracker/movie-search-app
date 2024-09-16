import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../moviesSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>; // Gets the state type from the store
export type AppDispatch = typeof store.dispatch;
