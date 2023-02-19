import * as jwt from 'jsonwebtoken';
import { User } from 'src/models/User/models/user.model';
import { ReqRes, UserAccessToken, UserRefreshToken } from 'src/types/common';
import { TokenError } from './error';

/** Eg: 60(ms), "2 days", "10h", "7d" */
type ExpiresInType = string | number;

/** (payload: object, expiresIn: string | number(ms)) => string */
export const getToken = <T extends object>(
  payload: T,
  expiresIn?: ExpiresInType,
) => {
  //@ts-ignore
  delete payload.exp;

  return jwt.sign(payload, process.env.APP_SECRET, {
    ...(expiresIn ? { expiresIn } : {}),
  });
};

/** (token: string) => tokenObject or empty object */
export const verifyToken = <T extends object>(token: string): T => {
  try {
    return jwt.verify(token, process.env.APP_SECRET) as T;
  } catch (e) {
    throw TokenError;
  }
};

/** (token: string) => tokenObject or empty object */
export const decodeToken = <T extends object>(token: string): T => {
  try {
    return jwt.decode(token) as T;
  } catch (e) {
    throw TokenError;
  }
};

export const setAuthPairTokens = (user: User, context: ReqRes): void => {
  const accessToken = getToken<UserAccessToken>(
    {
      id: user.id,
      role: user.role,
      isAccess: true,
    },
    '1h',
  );
  const refreshToken = getToken<UserRefreshToken>(
    {
      id: user.id,
      isRefresh: true,
    },
    '5d',
  );

  context.res.setHeader('access-token', accessToken);
  context.res.setHeader('refresh-token', refreshToken);
};
