import { io } from 'socket.io-client';
import channelsApi from './store/middlewares/channelsApi';
import store from './store/store'
import messagesApi from './store/middlewares/messagesApi';
import { addMessage } from './store/slices/messageSlice'
import { addChannel, updateChannel, deleteChannel, updateQueryData } from './store/slices/chatSlice';
import { setActiveChannel } from '../src/store/slices/chatSlice';

const socket = (store) => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    console.log(`new message${JSON.stringify(payload)}`)
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
    // store.dispatch(addMessage(payload));
    });

  socket.on('newChannel', (payload) => {
      console.log(payload);
      store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload);
    }));
  });

  socket.on('removeChannel', (payload) => {
      store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        const newChannels = draftChannels.filter((channel) => channel.id !== payload.id);
        const state = store.getState();
  
        if (state.channels.currentChatId === payload.id) {
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
  
    console.log(`Channel renamed: ${JSON.stringify(payload)}`);
  });
};
export default socket;