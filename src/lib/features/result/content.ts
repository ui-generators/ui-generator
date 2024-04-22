// Reference: https://redux.js.org/tutorials/essentials/part-2-app-structure
import { createSlice } from '@reduxjs/toolkit'
// import storage from 'redux-persist/lib/storage'; // Use local storage
// import { persistReducer } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage, // Save to local storage
// };

// interface PageContents {
//     [key: number]: string,
// }

// const pageContents: PageContents = {};

export const contentSlice = createSlice({
    name: 'content',
    initialState: {
        pageContents: new Map<number, string>(),
    },
    reducers: {
        setPageContent: (state, action) => {
            state.pageContents.set(action.payload.index, action.payload.code);
        },
    }
});

// const persistedReducer = persistReducer(persistConfig, contentSlice.reducer);

export const { setPageContent } = contentSlice.actions;

export default contentSlice.reducer;