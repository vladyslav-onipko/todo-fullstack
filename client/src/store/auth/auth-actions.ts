import axios from 'axios';

import { type ISignupInputValues, type ISigninInputValues, type IResponseUserAuthData } from '../../models/user';
import { setUserData } from './auth-slice';
import { AppDispatch } from '..';
import { setUserCookies, getUserCookies, removeUserCookies } from '../../utils/user-cookies';
import { HttpErrorMessage } from '../../utils/constants';

let tokenTimer: ReturnType<typeof setTimeout>;

export const auth = (mode: 'signin' | 'signup', userData: ISignupInputValues | ISigninInputValues) => {
  return async (dispatch: AppDispatch) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/${mode === 'signin' ? 'signin' : 'signup'}`;

    try {
      const response = (await axios.post(url, userData)) as IResponseUserAuthData;
      const tokenExpirationDate = new Date().getTime() + response.data.tokenExpiration; // calculate expires token time in future

      dispatch(setUserData({ isAuth: true, token: response.data.token, user: response.data.user }));
      setUserCookies({ user: response.data.user, token: response.data.token, tokenExpiration: tokenExpirationDate });

      tokenTimer = setTimeout(() => {
        dispatch(logout());
      }, response.data.tokenExpiration);

      return { message: response.data.message };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response) {
        throw new Error(e.response.data.message || HttpErrorMessage.Default);
      }

      if (e.request) {
        throw new Error(HttpErrorMessage.Default);
      }
    }
  };
};

export const logout = () => {
  return (dispatch: AppDispatch) => {
    removeUserCookies();
    dispatch(setUserData({ isAuth: false, token: null, user: { id: '', name: '', email: '' } }));
    clearTimeout(tokenTimer);
  };
};

export const autoLogin = () => {
  return (dispatch: AppDispatch) => {
    const userData = getUserCookies();

    if (!userData) return;

    const tokenExpiration = userData.tokenExpiration - new Date().getTime(); // calculate expires token time left

    if (tokenExpiration <= 0) return;

    dispatch(setUserData({ isAuth: true, token: userData.token, user: userData.user }));

    tokenTimer = setTimeout(() => {
      dispatch(logout());
    }, tokenExpiration);
  };
};
