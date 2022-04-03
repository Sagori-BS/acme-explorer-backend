import { BaseError } from '@common/common/errors/base-error.abstract';
import { ErrorCode } from '@common/common/errors/enums/error-code.enum';

export class BlockedUserError extends BaseError {
  code = ErrorCode.BLOCKED_USER;
  message = 'The current user is blocked';

  constructor() {
    super();
    Object.setPrototypeOf(this, BlockedUserError.prototype);
  }
}
