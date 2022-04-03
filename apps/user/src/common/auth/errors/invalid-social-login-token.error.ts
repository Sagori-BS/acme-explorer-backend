import { BaseError } from '@common/common/errors/base-error.abstract';
import { ErrorCode } from '@common/common/errors/enums/error-code.enum';

export class InvalidSocialLoginTokenError extends BaseError {
  public readonly code = ErrorCode.INVALID_CREDENTIALS;
  public readonly message = 'Invalid social login token';

  constructor() {
    super();
  }
}
