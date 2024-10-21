export const addMessage = (message) => ({
  type: 'ADD_MESSAGE',
  payload: message,
});

export const addChannel = (channel) => ({
  type: 'ADD_CHANNEL',
  payload: channel,
});

export const setActiveChannel = (channelId) => ({
  type: 'SET_ACTIVE_CHANNEL',
  payload: channelId,
});

export const activeChannel = (channelId) => ({
  type: 'ACTIVE_CHANNEL',
  payload: channelId,
});
