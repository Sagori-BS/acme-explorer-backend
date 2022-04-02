import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class MalformedTokenError extends BaseError {
  readonly code = ErrorCode.MALFORMED_TOKEN;
  message = 'The provided JWT is malformed';

  constructor() {
    super();
    Object.setPrototypeOf(this, MalformedTokenError.prototype);
  }
}
