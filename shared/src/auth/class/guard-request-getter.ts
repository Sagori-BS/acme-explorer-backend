import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GuardRequestGetter {
  public getRequest(context: ExecutionContext): any {
    switch (<GqlContextType>context.getType()) {
      case 'graphql':
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext();

      case 'http':
        return context.switchToHttp().getRequest();
      default:
        return undefined;
    }
  }
}
