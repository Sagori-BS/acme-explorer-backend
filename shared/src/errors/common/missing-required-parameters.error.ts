import { Env } from '@shared/config/env.enum';
import { BaseError } from '../base-error.abstract';

export class MissingRequiredParametersError extends BaseError {
  constructor(functionName = 'function') {
    super();

    Object.setPrototypeOf(this, MissingRequiredParametersError.prototype);

    const isProdEnv = process.env.NODE_ENV === Env.PRODUCTION;
    this.message = isProdEnv
      ? super.message
      : `Missing required input parameters in ${functionName}`;
  }
}
