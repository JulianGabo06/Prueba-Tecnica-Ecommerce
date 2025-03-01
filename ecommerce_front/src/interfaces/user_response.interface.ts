import { IUser } from "@/stores/user/user.interface";

export interface BasicIResponse {
  status: boolean;
  msg: string;
}

export interface IAuthResponse extends BasicIResponse {
  user: Omit<IUser, "password">;
}

export interface ILoginResponse extends BasicIResponse {
  data: {
    user: IUser;
    token: string;
  };
}

export interface IChangePasswordForm {
  password: string;
  confirm_password: string;
}

export interface IGetUserResponse {
  status: boolean;
  users: [GetUsers];
}

export interface GetUsers {
  id: number;
  name: string;
  email: string;
  role: string;
}
