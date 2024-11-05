import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.userInfo = null;
      state.role = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;