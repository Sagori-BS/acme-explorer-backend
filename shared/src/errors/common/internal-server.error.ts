import { BaseError } from '../base-error.abstract';

export class InternalServerError extends BaseError {
  constructor() {
    super();
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
