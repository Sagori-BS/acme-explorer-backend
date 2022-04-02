import { BaseError, IErrorDetail } from '../base-error.abstract';
import { Error as MongooseErrors } from 'mongoose';
import { ErrorCode } from '../enums/error-code.enum';
import * as joi from 'joi';
import { formatMongooseValidationError } from './utils/format-mongoose-validation-error.util';
import { formatJoiValidationError } from './utils/format-joi-validation-error.util';

export class InvalidUserInputError extends BaseError {
  readonly code = ErrorCode.INVALID_USER_INPUT;
  readonly message = 'Invalid user input';

  constructor(errors: IErrorDetail[] = []) {
    super();

    Object.setPrototypeOf(this, InvalidUserInputError.prototype);

    this.errors = errors;
  }

  static fromMongooseValidationError(error: MongooseErrors.ValidationError) {
    const errors: IErrorDetail[] = formatMongooseValidationError(error);

    return new InvalidUserInputError(errors);
  }

  static fromJoiValidationError(error: joi.ValidationError) {
    const errors: IErrorDetail[] = formatJoiValidationError(error);

    return new InvalidUserInputError(errors);
  }
}
