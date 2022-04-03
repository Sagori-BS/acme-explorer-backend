import { BaseError } from '@common/common/errors/base-error.abstract';
import { ErrorCode } from '@common/common/errors/enums/error-code.enum';

const InvalidSignInMethod =
  'Cannot sign in using this method, user already has an account';

export class InvalidSignInMethodError extends BaseError {
  code = ErrorCode.INVALID_SIGN_IN_METHOD;
  message = InvalidSignInMethod;

  constructor() {
    super();
    Object.setPrototypeOf(this, InvalidSignInMethodError.prototype);
  }
}
