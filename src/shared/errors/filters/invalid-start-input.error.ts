import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidStartInputError extends BaseError {
  code = ErrorCode.INVALID_START_VALUE;

  constructor(value: number) {
    super();

    Object.setPrototypeOf(this, InvalidStartInputError.prototype);

    this.message = `Invalid limit value: "${value}". Start can only be an integer value`;
  }
}
