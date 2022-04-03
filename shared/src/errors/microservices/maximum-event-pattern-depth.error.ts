import { BaseError } from '../base-error.abstract';

export class MaximumEventPatternDepthError extends BaseError {
  public message =
    'Maximum event pattern depth: An event pattern can have maximum 2 depth';

  constructor() {
    super();

    Object.setPrototypeOf(this.code, MaximumEventPatternDepthError.prototype);
  }
}
