export interface LoginDto {
  email: string;
  password: string;
}

export type TLoginResponse = {
  status: boolean;
  statusCode: string;
  message: string;
  response: {
    user: {
      firstname: string;
      lastname: string;
      userId: number;
      email: string;
      roles: Array<{
        label: string;
        value: number;
      }>;
      territoryMapping: {};
      createdAt: string;
      parentRoleId: number;
      customToken: string;
      orderpageversion: boolean;
      profileImageUrl: string;
    };
  };
};

export type TSentinelLoginResponse = {
  data: {
    displayName: string;
    email: string;
    token: string;
    refreshToken: string;
    expiresIn: string;
    uuid: string;
    registered: boolean;
    firebaseCustomToken: string;
  };
  status: boolean;
};
