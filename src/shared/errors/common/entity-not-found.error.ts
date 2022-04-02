import { BaseError } from '../base-error.abstract';
import { ErrorCode } from '../enums/error-code.enum';

export class EntityNotFoundError extends BaseError {
  code: ErrorCode.ENTITY_NOT_FOUND = ErrorCode.ENTITY_NOT_FOUND;

  constructor(entityName = 'entity') {
    super();

    Object.setPrototypeOf(this, EntityNotFoundError.prototype);
    this.message = `${entityName} not found`.toLowerCase();
  }
}
