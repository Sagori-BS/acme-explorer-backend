import { BaseError } from '../base-error.abstract';

export class InvalidEventPatternError extends BaseError {
  public message = 'Invalid event pattern';

  constructor() {
    super();

    Object.setPrototypeOf(this, InvalidEventPatternError.prototype);
  }
}
