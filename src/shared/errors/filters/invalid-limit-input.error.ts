import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidLimitInputError extends BaseError {
  code = ErrorCode.INVALID_LIMIT_VALUE;

  constructor(value: number) {
    super();

    Object.setPrototypeOf(this, InvalidLimitInputError.prototype);

    this.message = `Invalid limit value: "${value}". Limit can only be a integer value`;
  }
}
