import { BaseError } from '../base-error.abstract';

export class InternalServerError extends BaseError {
  constructor(internalMessage = 'internal server error') {
    super();
    this.isPublic = false;
    this.message = internalMessage;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
