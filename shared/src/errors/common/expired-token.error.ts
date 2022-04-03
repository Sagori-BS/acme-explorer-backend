import { BaseError } from '@shared/errors/base-error.abstract';
import { ErrorCode } from '@shared/errors/enums/error-code.enum';

export class ExpiredTokenError extends BaseError {
  readonly code = ErrorCode.EXPIRED_TOKEN;
  message = 'The provided JWT is expired';

  constructor() {
    super();
    Object.setPrototypeOf(this, ExpiredTokenError.prototype);
  }
}
