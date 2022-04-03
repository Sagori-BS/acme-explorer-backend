import { ErrorCode } from './enums/error-code.enum';

export interface IErrorDetail {
  field: string;
  message: string;
}

export abstract class BaseError extends Error {
  public code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR;
  public message = 'Internal server Error';
  public errors: IErrorDetail[] = [];

  constructor() {
    super();
    Object.setPrototypeOf(this, BaseError.prototype);
  }
}
