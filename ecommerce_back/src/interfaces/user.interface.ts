export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    status: boolean;
    createdAt?: Date;
}

export type IUserSignUp = Omit<IUser, "id" | "status" | "createdAt">
export type IUserSignIn = Omit<IUser, "id" | "status" | "createdAt" | "name">