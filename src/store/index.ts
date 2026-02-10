import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { TStoreState } from './types';
import { createCounterSlice } from './slices/counterSlice';
import { createUserSlice } from './slices/userSlice';

export const useBoundStore = create<TStoreState>()(
  immer((...a) => ({
    ...createCounterSlice(...a),
    ...createUserSlice(...a),
  }))
);
