import { BaseError } from '@shared/errors/base-error.abstract';
import { ErrorCode } from '@shared/errors/enums/error-code.enum';

export class BadImplementationError extends BaseError {
  readonly code = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'Bad implementation';

  constructor() {
    super();
    Object.setPrototypeOf(this, BadImplementationError.prototype);
  }
}
