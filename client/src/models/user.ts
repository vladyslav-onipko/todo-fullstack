export type IUser = {
  id: string;
  name: string;
  email: string;
};

export interface IUserAuthData {
  token: string | null;
  isAuth: boolean;
  user: IUser;
}

export interface IResponseUserAuthData {
  data: {
    message: string;
    token: string;
    tokenExpiration: number;
    user: IUser;
  };
}

export interface ISignupInputValues {
  name: string;
  email: string;
  password: string;
}

export interface ISigninInputValues {
  email: string;
  password: string;
}

export interface IUserCookiesData {
  user: IUser;
  token: string;
  tokenExpiration: number;
}
