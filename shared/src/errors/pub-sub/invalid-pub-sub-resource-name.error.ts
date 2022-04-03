import { BaseError } from '../base-error.abstract';

export class InvalidPubSubResourceNameError extends BaseError {
  private readonly messagePrefix = 'Invalid pub-sub resource name';

  constructor(name: string) {
    super();

    Object.setPrototypeOf(this, InvalidPubSubResourceNameError.prototype);
    this.message = `${this.messagePrefix}: ${name} `;
  }
}
