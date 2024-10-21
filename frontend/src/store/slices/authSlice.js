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
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ token, username }));
    },
    clearAuthData(state) {
      state.token = null;
      state.username = '';
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    setAuthData(state, action) {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify({ token, username }));
    },
  },
});

export const { login, clearAuthData, setAuthData } = authSlice.actions;
export default authSlice.reducer;
