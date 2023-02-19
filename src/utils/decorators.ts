import { createParamDecorator, CustomDecorator } from '@nestjs/common';
import { CtxUser, UserAccessToken } from 'src/types/common';
import { AuthTokenError } from './error';
import { verifyToken } from './jwt';

export const ReqRes = createParamDecorator((_, payload) => {
  const [__, ___, ctx, ____] = payload.args;
  const { req, res } = ctx;
  return { req, res };
});

export const Me = createParamDecorator((_, payload): CtxUser => {
  try {
    const [__, ___, ctx, ____] = payload.args;

    const token = ctx.req.headers.get('Authorization');
    const { id, role } = verifyToken<UserAccessToken>(token);

    return { id, role };
  } catch (e) {
    throw AuthTokenError;
  }
});
