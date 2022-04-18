import { BaseError } from '@shared/errors/base-error.abstract';
import { ErrorCode } from '@shared/errors/enums/error-code.enum';

export class InvalidSocialLoginTokenError extends BaseError {
  public readonly code = ErrorCode.INVALID_CREDENTIALS;
  public readonly message = 'Invalid social login token';

  constructor() {
    super();
  }
}
