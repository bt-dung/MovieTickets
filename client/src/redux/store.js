import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slices/notification";

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
    },
});

export const RootState =typeof store.getState;

export const AppDispatch = typeof store.dispatch;
