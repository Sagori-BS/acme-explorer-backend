import { BaseError } from '@common/common/errors/base-error.abstract';
import { ErrorCode } from '@common/common/errors/enums/error-code.enum';

export class RevokedTokenError extends BaseError {
  code = ErrorCode.REVOKED_REFRESH_TOKEN;
  message = 'The provided JWT has been revoked';

  constructor() {
    super();
    Object.setPrototypeOf(this, RevokedTokenError.prototype);
  }
}
