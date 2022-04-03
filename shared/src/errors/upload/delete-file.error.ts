import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class DeleteFileError extends BaseError {
  code: ErrorCode.INTERNAL_SERVER_ERROR = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'Error deleting file';

  constructor() {
    super();
    Object.setPrototypeOf(this, DeleteFileError.prototype);
  }
}
