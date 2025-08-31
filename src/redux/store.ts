import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import qrReducer from "./qrSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    qr: qrReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;