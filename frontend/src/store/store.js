import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import messageReducer from './slices/messageSlice';
import messagesApi from './middlewares/messagesApi';
import channelsApi from './middlewares/channelsApi';
import authApi from './middlewares/authApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: chatReducer,
    messages: messageReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware, channelsApi.middleware, messagesApi.middleware),
});

export default store;
