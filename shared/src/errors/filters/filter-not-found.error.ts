import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class FilterNotFoundError extends BaseError {
  code = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'Filter not found';

  constructor() {
    super();
    Object.setPrototypeOf(this, FilterNotFoundError.prototype);
  }
}
