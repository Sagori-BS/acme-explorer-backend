import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class UploadPictureError extends BaseError {
  code: ErrorCode.INTERNAL_SERVER_ERROR = ErrorCode.INTERNAL_SERVER_ERROR;
  message = 'Error uploading file to S3';

  constructor() {
    super();
    Object.setPrototypeOf(this, UploadPictureError.prototype);
  }
}
