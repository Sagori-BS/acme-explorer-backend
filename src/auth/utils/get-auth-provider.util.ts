import { InvalidFunctionInputError } from '@common/common/errors/errors';
import { AuthProviders } from './auth-providers.enum';

export const getAuthProvider = (provider: string): AuthProviders => {
  switch (provider) {
    case AuthProviders.Google:
      return AuthProviders.Google;

    case AuthProviders.Facebook:
      return AuthProviders.Facebook;

    case AuthProviders.Local:
      return AuthProviders.Local;

    default:
      throw new InvalidFunctionInputError();
  }
};
