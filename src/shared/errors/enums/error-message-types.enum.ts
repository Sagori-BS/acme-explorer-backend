export enum ErrorMessage {
  EntityNotFoundError = 'Entity not found',
  ObjectTypeError = 'Expected variable of type object but found object of type',
  InvalidFieldValueErrorMessage = 'Field got an invalid value',
  DuplicateValueInArrayErrorMessage = 'Field got a duplicated value',
  InvalidFunctionInput = 'Received invalid function input',
  InvalidSlugConfigErrorMessage = 'Invalid slug configuration provided',
  TestFailedErrorMessage = 'Test failed',
  InvalidSignInMethod = 'Cannot sign in using this method, user already has an account'
}
