// Reference: https://redux.js.org/tutorials/essentials/part-2-app-structure
import { createSlice } from '@reduxjs/toolkit'

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

export const { setPageContent } = contentSlice.actions;

export default contentSlice.reducer;