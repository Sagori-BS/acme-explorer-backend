import { BaseError } from '@common/common/errors/base-error.abstract';
import { ErrorCode } from '@common/common/errors/enums/error-code.enum';

export class InvalidCredentialsError extends BaseError {
  code = ErrorCode.INVALID_CREDENTIALS;
  message = 'Provided incorrect email or password';

  constructor() {
    super();
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}
