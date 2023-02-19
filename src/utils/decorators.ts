import { createParamDecorator } from '@nestjs/common';
import { CtxUser, ReqRes, UserAccessToken } from 'src/types/common';
import { AuthTokenError } from './error';
import { verifyToken } from './jwt';

export const Me = createParamDecorator((_, payload): CtxUser => {
  try {
    const [__, ___, ctx, ____] = payload.args;
    const context = ctx as ReqRes;

    const token = context.req.headers['Authorization'];
    const { id, role, isAccess } = verifyToken<UserAccessToken>(
      token.toString(),
    );
    if (!isAccess) {
      throw AuthTokenError;
    }

    return { id, role };
  } catch (e) {
    throw AuthTokenError;
  }
});
