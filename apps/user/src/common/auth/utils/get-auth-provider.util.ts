import { InvalidFunctionInputError } from '@shared/errors/errors';
import { AuthProviders } from './auth-providers.enum';

export const getAuthProvider = (provider: string): AuthProviders => {
  switch (provider) {
    case AuthProviders.Google:
      return AuthProviders.Google;
      break;
    case AuthProviders.Facebook:
      return AuthProviders.Facebook;
      break;
    case AuthProviders.Local:
      return AuthProviders.Local;
      break;

    default:
      throw new InvalidFunctionInputError();
  }
};
