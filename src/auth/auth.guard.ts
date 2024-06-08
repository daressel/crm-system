import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const gqlCtx = GqlExecutionContext.create(context);
    const args = gqlCtx.getArgs();
    const handler = gqlCtx.getHandler();
    // const ctx = gqlCtx.getContext();
    console.log(args);
    // console.log(ctx);

    return true;
  }
}
