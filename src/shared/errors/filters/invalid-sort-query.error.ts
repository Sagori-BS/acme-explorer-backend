import { BaseError } from '../base-error.abstract';

export class InvalidSortQueryError extends BaseError {
  constructor(keys: string[]) {
    super();

    Object.setPrototypeOf(this, InvalidSortQueryError.prototype);

    this.message = `Invalid sort query. Sort queries with nested fields can only have one sort key. Received ${
      keys.length
    }: ${keys.join(', ')}`;
  }
}
