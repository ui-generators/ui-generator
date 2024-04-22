// Reference: https://redux.js.org/usage/nextjs
import { configureStore } from '@reduxjs/toolkit';
import persistedReducer from './features/result/content';
import { enableMapSet } from 'immer';
import { persistStore } from 'redux-persist';

enableMapSet(); // Enable MapSet plugin for Immer

export const makeStore = () => {
    return configureStore({
        reducer: {
            content: persistedReducer,
        },
    });
};

const store = makeStore();

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];