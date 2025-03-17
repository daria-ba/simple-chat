/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: (() => {
      const user = localStorage.getItem('user');
      return JSON.parse(user)?.token || null;
    })(),
    login: (() => {
      const user = localStorage.getItem('user');
      return JSON.parse(user)?.login || '';
    })(),
    userId: (() => {
      const user = localStorage.getItem('user');
      return JSON.parse(user)?.userId || '';
    })(),

    isAuthenticated: !!JSON.parse(localStorage.getItem('user'))?.token,
  },
  reducers: {
    auth(state, action) {
      const { token, login, userId } = action.payload;
      state.userId = userId;
      state.token = token;
      state.login = login;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ token, login, userId }));
    },
    clearAuthData(state) {
      state.userId = null;
      state.token = null;
      state.login = '';
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    setAuthData(state, action) {
      const { token, login, userId } = action.payload;
      state.userId = userId;
      state.token = token;
      state.login = login;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ token, login, userId }));
    },
  },
});

export const { auth, clearAuthData, setAuthData } = authSlice.actions;
export default authSlice.reducer;
