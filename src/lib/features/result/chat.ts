// Reference: https://redux.js.org/tutorials/essentials/part-2-app-structure
import { createSlice } from '@reduxjs/toolkit'
import { Data } from '@/constants/data';

export const chatHistorySlice = createSlice({
    name: 'chatHistory',
    initialState: {
        chatHistory: [] as Data[],
    },
    reducers: {
        addChatHistory: (state, action) => {
            state.chatHistory.push(action.payload.chatMessage);
        },
    }
});

export const { addChatHistory } = chatHistorySlice.actions;

export default chatHistorySlice.reducer;