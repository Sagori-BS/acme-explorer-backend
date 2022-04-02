import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidOperationError extends BaseError {
  code: ErrorCode.INVALID_OPERATION = ErrorCode.INVALID_OPERATION;

  constructor(message = 'Invalid Operation') {
    super();

    Object.setPrototypeOf(this, InvalidOperationError.prototype);
    this.message = message;
  }
}
