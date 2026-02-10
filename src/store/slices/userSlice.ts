import type { StateCreator } from 'zustand';
import type { TStoreState, TUserState } from '../types';

export const createUserSlice: StateCreator<
  TStoreState,
  [['zustand/immer', never]],
  [],
  TUserState
> = (set) => ({
  user: { name: '', email: '', age: 0, isAdmin: false },
  setUser: (user) =>
    set((state) => {
      state.user = { ...state.user, ...user };
    }),
  logout: () =>
    set((state) => {
      state.user = { name: '', email: '', age: 0, isAdmin: false };
    }),
});
