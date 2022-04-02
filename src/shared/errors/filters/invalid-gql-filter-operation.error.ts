import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidGqlFilterOperationError extends BaseError {
  code = ErrorCode.INVALID_GQL_FILTER_OPERATION;

  constructor(operation: string) {
    super();

    Object.setPrototypeOf(this, InvalidGqlFilterOperationError.prototype);

    this.message = `Invalid GQL filter operation: "${operation}" is not defined`;
  }
}
