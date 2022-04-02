import { BaseError } from '@common/common/errors/base-error.abstract';
import { ErrorCode } from '@common/common/errors/enums/error-code.enum';

export class BadImplementationError extends BaseError {
  readonly code = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'Bad implementation';

  constructor() {
    super();
    this.isPublic = false;
    Object.setPrototypeOf(this, BadImplementationError.prototype);
  }
}
