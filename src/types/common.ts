export interface UserAccessToken {
  id: string;
  role: string;
  isAccess: boolean;
}

export type CtxUser = Pick<UserAccessToken, 'id' | 'role'>;

export interface UserRefreshToken {
  id: string;
  isRefresh: boolean;
}

export interface TokenForRegistration {
  email: string;
  encryptedCode: string;
  firstName: string;
  lastName: string;
  password: string;
}
