import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidStatusCodeError extends BaseError {
  constructor(_statusCode: number, isPublic = false) {
    super();
    Object.setPrototypeOf(this, InvalidStatusCodeError.prototype);
    this.name = InvalidStatusCodeError.name;
    this.message = `invalid status code: ${_statusCode}`;
    this.isPublic = isPublic;
    this.code = ErrorCode.INVALID_STATUS_CODE;
  }
}
