import jwt from 'jsonwebtoken';
import { TokenError } from './error';

/** Eg: 60(ms), "2 days", "10h", "7d" */
type ExpiresInType = string | number;

/** (payload: object, expiresIn: string | number(ms)) => string */
export const getToken = <T extends { exp: any }>(
  payload: T,
  expiresIn?: ExpiresInType,
) => {
  delete payload.exp;
  return jwt.sign(payload, process.env.APP_SECRET, {
    expiresIn: expiresIn,
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
