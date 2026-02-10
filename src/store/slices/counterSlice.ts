import type { StateCreator } from 'zustand';
import type { TCounterState, TStoreState } from '../types';

export const createCounterSlice: StateCreator<
  TStoreState,
  [['zustand/immer', never]],
  [],
  TCounterState
> = (set) => ({
  count: 0,
  increment: () =>
    set((state) => {
      state.count += 1;
    }),
  decrement: () =>
    set((state) => {
      state.count -= 1;
    }),
  reset: () => set({ count: 0 }),
  incrementBy: (amount: number) =>
    set((state) => {
      state.count += amount;
    }),
});
