import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const chatSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    isLoading: false,
    error: null,
    currentChatId: '1',
  },
  reducers: {
    getChannelsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getChannelsSuccess: (state, action) => {
      state.isLoading = false;
      state.channels = action.payload;
    },
    getChannelsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addChannelSuccess: (state, action) => {
      const chatIdtoAdd = action.payload;
      // console.log(`add channel success ${JSON.stringify(chatIdtoAdd.id)}`)
      state.channels.push(action.payload);
      if (state.currentChatId !== chatIdtoAdd.id) {
        state.currentChatId = chatIdtoAdd.id;
      }
    },
    updateChannelSuccess: (state, action) => {
      const exists = state.channels.find(channel => channel.id === action.payload.id);
      if (!exists) {
        state.channels.push(action.payload);
      }
    },
    deleteChannelSuccess: (state, action) => {
      const chatIdToDelete = action.payload;
      state.channels = state.channels.filter(channel => channel.id !== chatIdToDelete);
      if (state.currentChatId === chatIdToDelete) {
        state.currentChatId = '1';
      }

    },
    setActiveChannel: (state, action) => {
      state.currentChatId = action.payload;
    },
  },
});

export const {
  getChannelsStart, getChannelsSuccess, getChannelsFailure,
  addChannelSuccess, updateChannelSuccess, deleteChannelSuccess, setActiveChannel
} = chatSlice.actions;

export default chatSlice.reducer;

export const fetchChannels = () => async (dispatch) => {
  dispatch(getChannelsStart());
  try {
    const user = localStorage.getItem('user');
    const token = JSON.parse(user)?.token;
    const response = await axios.get('/api/v1/channels', {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getChannelsSuccess(response.data));
  } catch (error) {
    dispatch(getChannelsFailure(error.message));
  }
};

export const addChannel = (newChannel) => async (dispatch) => {
  try {
    const user = localStorage.getItem('user');
    const token = JSON.parse(user)?.token;
    const response = await axios.post('/api/v1/channels', newChannel, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(addChannelSuccess(response.data));
  } catch (error) {
    console.error('Ошибка добавления канала', error);
  }
};

export const updateChannel = (updatedChannel) => async (dispatch) => {
  try {
    const user = localStorage.getItem('user');
    const token = JSON.parse(user)?.token;
    const response = await axios.put(`/api/v1/channels/${updatedChannel.id}`, updatedChannel, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(updateChannelSuccess(response.data));  // Обновляем канал в состоянии
  } catch (error) {
    console.error('Ошибка изменения канала', error);
  }
};

export const deleteChannel = (channelId) => async (dispatch) => {
  try {
    const user = localStorage.getItem('user');
    const token = JSON.parse(user)?.token;
    await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteChannelSuccess(channelId));  // Удаляем канал из состояния
  } catch (error) {
    console.error('Ошибка удаления канала', error);
  }
};

// export const { actions } = chatSlice;
// export default chatSlice.reducer;