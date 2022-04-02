import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class EmailNotSentError extends BaseError {
  code: ErrorCode.INTERNAL_SERVER_ERROR = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'Email not sent';

  constructor() {
    super();
    Object.setPrototypeOf(this, EmailNotSentError.prototype);
  }
}
