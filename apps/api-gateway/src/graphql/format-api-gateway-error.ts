import { Env } from '@shared/config/env.enum';
import { BaseError } from '@shared/errors/base-error.abstract';
import { IGqlError } from '@shared/errors/utils/gql-error-formatter.util';
import { GraphQLError } from 'graphql';

export const formatGqlApiGatewayError = (gqlError: GraphQLError): IGqlError => {
  const baseError: BaseError = gqlError.extensions.exception;

  const { code, errors, message } = baseError;
  const isProdEnv = process.env.NODE_ENV === Env.PRODUCTION;

  return {
    code: code,
    errors: errors,
    message: message,
    extensions: isProdEnv ? undefined : gqlError.extensions,
  };
};
