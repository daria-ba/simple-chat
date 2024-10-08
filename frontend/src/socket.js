import { io } from 'socket.io-client';
import channelsApi from './store/middlewares/index';
import messagesApi from './store/middlewares/index';
import { addMessage} from './store/slices/messageSlice'
import { addChannel, updateChannel, deleteChannel } from './store/slices/chatSlice';
// import { actions } from '../src/store/slices/messageSlice';

const socket = (store) => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    console.log(`new message${JSON.stringify(payload)}`)
    store.dispatch(addMessage(payload));
    });

  socket.on('newChannel', (payload) => {
    // console.log(payload);
    console.log('Получено событие newChannel:', payload);
  });

  socket.on('removeChannel', (payload) => {
      console.log(payload);
    });

  socket.on('renameChannel', (payload) => {
    // console.log(`Channel renamed: ${JSON.stringify(payload)}`);
    store.dispatch(updateChannel(payload));
  });
};

export default socket;