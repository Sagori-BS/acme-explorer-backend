import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidFieldNameFilterError extends BaseError {
  code = ErrorCode.INVALID_USER_INPUT;

  constructor(fieldName: string) {
    super();

    Object.setPrototypeOf(this, InvalidFieldNameFilterError.prototype);

    this.message = `Invalid field name: ${fieldName}. Filter names can only have one _ character`;
  }
}
