export type TUser = {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  isAdmin?: boolean;
  token: string | null;
  parentRoleId: number;
  roles: Array<{ label: string; value: number }>;
};

export type TUserState = {
  user: TUser;
  setUser: (user: TUser) => void;
  setToken: (token: string | null) => void;
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
