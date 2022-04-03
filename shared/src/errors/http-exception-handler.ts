import { ArgumentsHost } from '@nestjs/common';
import { BaseError } from './base-error.abstract';
import { InternalServerError } from './common/internal-server.error';

export class HttpExceptionHandler {
  public handleException(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let _exception = exception;

    if (!(exception instanceof BaseError)) {
      _exception = new InternalServerError();
    }

    const { code, errors, message } = _exception as BaseError;

    //TODO: Add custom error code and stack trace
    response.status(500).json({
      code,
      errors,
      message,
    });
  }
}
