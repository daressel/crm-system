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
