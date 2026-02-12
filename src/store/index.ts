import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { TStoreState } from './types';
import { createCounterSlice } from './slices/counterSlice';
import { createUserSlice } from './slices/userSlice';

/**
 * @description A global store for the application, Note: Use all application state in this store.
 */
export const useBoundStore = create<TStoreState>()(
  immer((...a) => ({
    ...createCounterSlice(...a),
    ...createUserSlice(...a),
  }))
);
