import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type UserAuthData } from '../../models/user';

const initialAuthState: UserAuthData = {
  isAuth: false,
  token: null,
  user: {
    id: '',
    name: '',
    email: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUserData(state, actions: PayloadAction<UserAuthData>) {
      state.isAuth = actions.payload.isAuth;
      state.token = actions.payload.token;
      state.user = actions.payload.user;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserData } = authSlice.actions;
