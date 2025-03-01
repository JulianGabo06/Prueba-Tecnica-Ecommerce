import { StateCreator, create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { State, SignInProps, Action, IUser } from "./user.interface";
import cookiesStorage from "../cookies.storage"

const initialState: State = {
  token: null,
  user: null,
};

const storeAPI: StateCreator<State & Action, [["zustand/devtools", never]]> = (
  set,
  _
) => ({
  ...initialState,
  signIn: (data: SignInProps) => set(() => data, false, "signIn"),
  logOut: () => set(() => initialState, false, "logOut"),
  auth: (data: SignInProps) => set(() => data, false, "auth"),
  updateUser: (user: IUser) => set(() => ({ user }), false, "updateUser"),
});

//para ver como funciona

export const useUserStore = create<State & Action>()(
  devtools(
    persist(immer(storeAPI), {
      name: "userSession",
      storage: createJSONStorage(() => cookiesStorage)
    })
  )
);