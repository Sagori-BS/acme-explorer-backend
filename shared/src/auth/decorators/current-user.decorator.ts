import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    switch (<GqlContextType>context.getType()) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        request.body = ctx.getArgs();
        return request.user;

      case 'http':
        const _ctx = context.switchToHttp().getRequest();
        return _ctx.user;
      default:
        return undefined;
    }
  },
);
