import { BaseError } from '@shared/errors/base-error.abstract';
import { ErrorCode } from '@shared/errors/enums/error-code.enum';

export class DuplicateKeyError extends BaseError {
  readonly code: ErrorCode.DUPLICATE_KEY | ErrorCode.DUPLICATE_EMAIL =
    ErrorCode.DUPLICATE_KEY;

  constructor(errorMessage: string) {
    super();
    Object.setPrototypeOf(this, DuplicateKeyError.prototype);

    const { field, value } = this.parseMongoErrorMessage(errorMessage);

    this.message = `Duplicate key error. Field: ${field} | Value: ${value}`;

    if (field === 'email') this.code = ErrorCode.DUPLICATE_EMAIL;
  }

  private parseMongoErrorMessage(message) {
    try {
      const dupKeyObj = message.split('dup key: ')[1];
      const field = dupKeyObj.substring(2, dupKeyObj.indexOf('"') - 2);
      const value = dupKeyObj.substring(
        dupKeyObj.indexOf('"') + 1,
        dupKeyObj.lastIndexOf('"'),
      );

      return { field, value };
    } catch (error) {
      return {};
    }
  }
}
