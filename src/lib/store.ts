// Reference: https://redux.js.org/usage/nextjs
import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './features/result/content';

export const makeStore = () => {
    return configureStore({
        reducer: {
            content: contentReducer,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];