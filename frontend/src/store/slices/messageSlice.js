import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [],
    status: 'idle',
  },
  reducers: {
    setMessages(state, action) {
      // console.log(action.payload)
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
      console.log(action)
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const { setMessages, addMessage, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;