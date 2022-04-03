import { BaseError } from '@common/common/errors/base-error.abstract';
import { ErrorCode } from '@common/common/errors/enums/error-code.enum';

export class PasswordMismatchError extends BaseError {
  code = ErrorCode.INVALID_CREDENTIALS;
  message = 'Provided password does not match current password';

  constructor() {
    super();
    Object.setPrototypeOf(this, PasswordMismatchError.prototype);
  }
}
