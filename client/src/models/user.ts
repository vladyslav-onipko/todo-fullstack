export type User = {
  id: string;
  name: string;
  email: string;
};

export interface UserAuthData {
  token: string | null;
  isAuth: boolean;
  user: User;
}

export interface ResponseUserAuthData {
  data: {
    message: string;
    token: string;
    tokenExpiration: number;
    user: User;
  };
}

export interface SignupInputValues {
  name: string;
  email: string;
  password: string;
}

export interface SigninInputValues {
  email: string;
  password: string;
}

export interface UserCookiesData {
  user: User;
  token: string;
  tokenExpiration: number;
}
