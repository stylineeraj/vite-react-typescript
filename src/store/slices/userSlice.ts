import type { StateCreator } from 'zustand';
import type { TStoreState, TUserState } from '../types';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const createUserSlice: StateCreator<
  TStoreState,
  [['zustand/immer', never]],
  [],
  TUserState
> = (set) => ({
  user: {
    id: 0,
    name: '',
    email: '',
    profileImage: '',
    parentRoleId: 0,
    roles: [],
    isAdmin: false,
    token: null,
  },
  setUser: (user) =>
    set((state) => {
      state.user = { ...state.user, ...user };
      localStorage.setItem(USER_KEY, JSON.stringify(state.user));
    }),
  setToken: (token) =>
    set((state) => {
      state.user.token = token;
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }),
  logout: () =>
    set((state) => {
      state.user = {
        id: 0,
        name: '',
        email: '',
        profileImage: '',
        parentRoleId: 0,
        roles: [],
        token: null,
      };
      localStorage.removeItem(USER_KEY);
    }),
});
