// Reference: https://redux.js.org/usage/nextjs
import { configureStore } from '@reduxjs/toolkit';
import chatHistoryReducer from './features/result/chat';

export const makeStore = () => {
    return configureStore({
        reducer: {
            chat: chatHistoryReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];