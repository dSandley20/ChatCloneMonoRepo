import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import serverReducer from "./slices/serverSlice";

const store = configureStore({
  reducer: {
    servers: serverReducer,
    app: appReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
