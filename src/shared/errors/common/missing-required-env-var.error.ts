import { BaseError } from '../base-error.abstract';

export class MissingRequiredEnvVarError extends BaseError {
  constructor(varName: string) {
    super();
    Object.setPrototypeOf(this, MissingRequiredEnvVarError.prototype);
    this.message = `missing required env var: ${varName}`;
  }
}
