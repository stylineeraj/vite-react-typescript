export type TUserState = {
  user: { name: string; email: string; age: number; isAdmin: boolean };
  setUser: (user: { name: string; email: string }) => void;
  logout: () => void;
};

export type TCounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
};

export type TStoreState = TCounterState & TUserState;
