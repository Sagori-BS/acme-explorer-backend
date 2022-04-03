import { ILoggerService } from '@shared/logger/logger.models';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { DuplicateKeyError } from '../common/duplicate-key.error';
import { HttpExceptionHandler } from '../http-exception-handler';

@Catch()
export class CustomExceptionsFilter implements ExceptionFilter {
  constructor(
    private logger: ILoggerService,
    private httpExeptionHandler: HttpExceptionHandler,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const hostType = <GqlContextType>host.getType();
    const handledException = this.handleException(exception);

    this.logger.error(handledException.message);

    if (hostType === 'http') {
      return this.httpExeptionHandler.handleException(handledException, host);
    } else if (hostType === 'graphql') {
      return handledException;
    }
  }

  private handleException(exception: any) {
    let handledException = exception;

    if (exception.name && exception.name === 'MongoServerError') {
      if (exception.code) {
        switch (exception.code) {
          case 11000:
            handledException = new DuplicateKeyError(exception.message);
            break;
        }
      }
    }

    return handledException;
  }
}
