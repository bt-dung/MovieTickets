import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: {
        items: [],
        unreadCount: 0,
        loading: false,
        error: null
    },
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.items.push(action.payload);
            state.notifications.unreadCount += 1;
        },
        removeNotification: (state, action) => {
            state.notifications.items = state.notifications.items.filter(
                (notification) => notification.id !== action.payload
            );
            state.notifications.unreadCount -= 1;
        },
    },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
