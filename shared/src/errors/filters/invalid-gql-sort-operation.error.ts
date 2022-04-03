import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidGqlSortOperationError extends BaseError {
  code = ErrorCode.INVALID_GQL_SORT_OPERATION;

  constructor(operation: string) {
    super();

    Object.setPrototypeOf(this, InvalidGqlSortOperationError.prototype);

    this.message = `Invalid GQL sort operation: "${operation}" is not defined`;
  }
}
