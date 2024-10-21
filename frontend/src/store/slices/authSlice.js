import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: (() => {
      const user = localStorage.getItem('user');
      return JSON.parse(user)?.token || null;
    })(),
    username: (() => {
      const user = localStorage.getItem('user');
      return JSON.parse(user)?.username || '';
    })(),
    isAuthenticated: !!JSON.parse(localStorage.getItem('user'))?.token,
  },
  reducers: {
    login(state, action) {
      const newState = { ...state };
      const { token, username } = action.payload;
      newState.token = token;
      newState.username = username;
      newState.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ token, username }));
    },
    clearAuthData(state) {
      const newState = { ...state };
      newState.token = null;
      newState.username = '';
      newState.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    setAuthData(state, action) {
      const newState = { ...state };
      const { token, username } = action.payload;
      newState.token = token;
      newState.username = username;
      newState.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ token, username }));
    },
  },
});

export const { login, clearAuthData, setAuthData } = authSlice.actions;
export default authSlice.reducer;
