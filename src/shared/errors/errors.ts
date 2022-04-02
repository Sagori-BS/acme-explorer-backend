import { UserInputError, ApolloError } from 'apollo-server-express';
import { ErrorMessage } from './enums/error-message-types.enum';
import {
  buildOperationErrorMessage,
  buildTypeErrorMessage
} from './utils/error-builders';

export class InvalidFunctionInputError extends Error {
  constructor() {
    super(ErrorMessage.InvalidFunctionInput);
  }
}

export class TestFailedError extends Error {
  constructor() {
    super(ErrorMessage.TestFailedErrorMessage);
  }
}

export class InvalidObjectTypeException extends ApolloError {
  constructor(objectType: string) {
    super(buildTypeErrorMessage(objectType, ErrorMessage.ObjectTypeError));
  }
}

// TODO Eliminate this in future
export class EntryNotFoundException extends ApolloError {
  constructor() {
    super(ErrorMessage.EntityNotFoundError);
  }
}

export class InvalidFieldValueException extends UserInputError {
  constructor(fieldName: string) {
    super(
      buildTypeErrorMessage(
        fieldName,
        ErrorMessage.InvalidFieldValueErrorMessage
      )
    );
  }
}

export class InvalidSlugConfigException extends Error {
  constructor() {
    super(ErrorMessage.InvalidSlugConfigErrorMessage);
  }
}

export class DuplicateValueInArrayException extends UserInputError {
  constructor(fieldName: string) {
    super(
      buildOperationErrorMessage(
        fieldName,
        ErrorMessage.DuplicateValueInArrayErrorMessage
      )
    );
  }
}
