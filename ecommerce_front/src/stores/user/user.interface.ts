export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  status: boolean;
  createdAt?: Date;
}

export interface State {
  user: IUser | null;
  token: string | null;
}

export interface SignInProps {
  user: IUser;
  token: string;
}

export interface Action {
  signIn: (props: SignInProps) => void;
  logOut: () => void;
}

export type IUserFormSignUp = Omit<
  IUser,
  "id" | "role" | "status" | "createdAt"
> & {
  confirm_password: string;
};

export type IUserFormSignIn = Omit<
  IUser,
  "id" | "role" | "status" | "createdAt" | "name"
>;
