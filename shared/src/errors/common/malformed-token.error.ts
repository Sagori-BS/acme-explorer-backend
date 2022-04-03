import { BaseError } from '@shared/errors/base-error.abstract';
import { ErrorCode } from '@shared/errors/enums/error-code.enum';

export class MalformedTokenError extends BaseError {
  readonly code = ErrorCode.MALFORMED_TOKEN;
  message = 'The provided JWT is malformed';

  constructor() {
    super();
    Object.setPrototypeOf(this, MalformedTokenError.prototype);
  }
}
