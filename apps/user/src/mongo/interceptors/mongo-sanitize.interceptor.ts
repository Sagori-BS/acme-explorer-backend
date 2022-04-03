import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  ContextType,
} from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as mongoSanitize from 'express-mongo-sanitize';

const GRAPHQL_CONTEXT: GqlContextType = 'graphql';
const HTTP_CONTEXT: ContextType = 'http';

@Injectable()
export class MongoSanitizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextType = <GqlContextType>context.getType();
    const sanitize = field => mongoSanitize.sanitize(field, {});

    if (contextType === GRAPHQL_CONTEXT) {
      // Convert ExecutionContext to GqlContext to get query arguments
      const ctx = GqlExecutionContext.create(context);

      sanitize(ctx.getArgs());
    } else if (contextType === HTTP_CONTEXT) {
      const [req] = context.getArgs();

      sanitize(req.body);
      sanitize(req.query);
      sanitize(req.params);
    }

    return next.handle();
  }
}
