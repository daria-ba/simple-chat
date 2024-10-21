import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const chatSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    isLoading: false,
    error: null,
    currentChannelId: '1',
  },
  reducers: {
    getChannelsStart: (state) => {
      const newState = { ...state };
      newState.isLoading = true;
      newState.error = null;
    },
    getChannelsSuccess: (state, action) => {
      const newState = { ...state };
      newState.isLoading = false;
      newState.channels = action.payload;
    },
    getChannelsFailure: (state, action) => {
      const newState = { ...state };
      newState.isLoading = false;
      newState.error = action.payload;
    },
    addChannelSuccess: (state, action) => {
      const channelIdtoAdd = action.payload;
      state.channels.push(action.payload);
      if (state.currentChannelId !== channelIdtoAdd.id) {
        state.currentChannelId = channelIdtoAdd.id;
      }
    },
    editChannelSuccess: (state, action) => {
      const exists = state.channels.find((channel) => channel.id === action.payload.id);
      if (!exists) {
        state.channels.push(action.payload);
      }
    },
    deleteChannelSuccess: (state, action) => {
      const newState = { ...state };
      const channelIdToDelete = action.payload;
      newState.channels = state.channels.filter((channel) => channel.id !== channelIdToDelete);
      if (state.currentChannelId === channelIdToDelete) {
        state.currentChannelId = '1';
      }
    },
    setActiveChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const {
  getChannelsStart, getChannelsSuccess, getChannelsFailure,
  addChannelSuccess, editChannelSuccess, deleteChannelSuccess, setActiveChannel,
} = chatSlice.actions;

export default chatSlice.reducer;

export const fetchChannels = () => async (dispatch, getState) => {
  const { channels } = getState();
  if (channels.length > 0) {
    return;
  }
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

export const editChannel = (editedChannel) => async (dispatch) => {
  try {
    const user = localStorage.getItem('user');
    const token = JSON.parse(user)?.token;
    const response = await axios.put('/api/v1/channels', editedChannel, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(editChannelSuccess(response.data));
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
    dispatch(deleteChannelSuccess(channelId));
  } catch (error) {
    console.error('Ошибка удаления канала', error);
  }
};
