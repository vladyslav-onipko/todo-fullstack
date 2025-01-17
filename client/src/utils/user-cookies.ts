import Cookies from 'js-cookie';

import { IUserCookiesData } from '../models/user';

const COOKIES_KEY = 'user-data';

export const setUserCookies = (data: IUserCookiesData) => {
  Cookies.set(
    COOKIES_KEY,
    JSON.stringify({ user: data.user, token: data.token, tokenExpiration: data.tokenExpiration })
  );
};

export const getUserCookies = (): IUserCookiesData => {
  const userData = Cookies.get(COOKIES_KEY);

  return userData ? JSON.parse(userData) : null;
};

export const removeUserCookies = () => {
  Cookies.remove(COOKIES_KEY);
};
