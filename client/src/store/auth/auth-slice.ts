import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { type IUserAuthData } from '../../models/user';

const initialAuthState: IUserAuthData = {
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
    setUserData(state, actions: PayloadAction<IUserAuthData>) {
      state.isAuth = actions.payload.isAuth;
      state.token = actions.payload.token;
      state.user = actions.payload.user;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserData } = authSlice.actions;
