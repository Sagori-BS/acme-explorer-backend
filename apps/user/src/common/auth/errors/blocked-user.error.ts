import { BaseError } from '@shared/errors/base-error.abstract';
import { ErrorCode } from '@shared/errors/enums/error-code.enum';

export class BlockedUserError extends BaseError {
  code = ErrorCode.BLOCKED_USER;
  message = 'The current user is blocked';

  constructor() {
    super();
    Object.setPrototypeOf(this, BlockedUserError.prototype);
  }
}
