export const addMessage = (message) => ({
    type: 'ADD_MESSAGE',
    payload: message,
  });
  
  export const addChat = (chat) => ({
    type: 'ADD_CHAT',
    payload: chat,
  });
  
  export const setActiveChat = (chatId) => ({
    type: 'SET_ACTIVE_CHAT',
    payload: chatId,
  });

  export const activeChat = (chatId) => ({
    type: 'ACTIVE_CHAT',
    payload: chatId,
  });