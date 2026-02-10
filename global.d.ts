/// <reference types="vite/client" />

type TCounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
};

declare global {
  type TStoreState = TCounterState;
}

export {};
