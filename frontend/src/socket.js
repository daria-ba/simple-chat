import { io } from 'socket.io-client';
import channelsApi from './store/middlewares/channelsApi';
import messagesApi from './store/middlewares/messagesApi';
import { setActiveChannel } from '../src/store/slices/chatSlice';

const socket = (store) => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload);
    }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const newChannels = draftChannels.filter((channel) => channel.id !== payload.id);
      const state = store.getState();

      if (state.channels.currentChannelId === payload.id) {
        store.dispatch(setActiveChannel('1'));
      }

      return newChannels;
    }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const channel = draftChannels.find((item) => item.id === payload.id);
      if (channel) {
        channel.name = payload.name;
      }

    }));
  });
};

export default socket;
