import { Env } from '@shared/config/env.enum';
import { GraphQLError } from 'graphql';
import { BaseError, IErrorDetail } from '../base-error.abstract';
import { InternalServerError } from '../common/internal-server.error';
import { ErrorCode } from '../enums/error-code.enum';

export interface IGqlError {
  code: ErrorCode;
  message: string;
  errors: IErrorDetail[];
  extensions?: Record<string, any>;
}

export const gqlErrorFormatter = (err: GraphQLError): IGqlError => {
  const { originalError } = err;
  const isProdEnv = process.env.NODE_ENV === Env.PRODUCTION;

  if (originalError instanceof BaseError) {
    return _baseErrorFormatter(err, isProdEnv);
  }

  return _internalServerErrorFormatter(err, isProdEnv);
};

const _baseErrorFormatter = (
  err: GraphQLError,
  isProdEnv = false,
): IGqlError => {
  const { originalError, extensions } = err;
  const { code, errors, message } = originalError as BaseError;

  return {
    code,
    errors,
    message,
    extensions: isProdEnv ? undefined : extensions,
  };
};

const _internalServerErrorFormatter = (
  err: GraphQLError,
  isProdEnv = false,
): IGqlError => {
  const { message, extensions } = err;

  const internalServerError = new InternalServerError();

  return {
    code: internalServerError.code,
    errors: internalServerError.errors,
    message: isProdEnv ? internalServerError.message : message,
    extensions: isProdEnv ? undefined : extensions,
  };
};
