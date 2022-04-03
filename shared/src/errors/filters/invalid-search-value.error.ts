import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidSearchValueError extends BaseError {
  readonly code = ErrorCode.INVALID_USER_INPUT;
  readonly;

  constructor(value: any) {
    super();

    Object.setPrototypeOf(this, InvalidSearchValueError.prototype);

    this.message = `Invalid search parameter. Expected string found: ${JSON.stringify(
      value,
    )}`;
  }
}
