import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,
  role:null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.userInfo = action.payload.userInfo;
      state.role=action.payload.role;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userInfo = null;
      state.role=null;
      state.isAuthenticated = false;
    },
    updateUser(state, action) {
      state.userInfo = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;