import { ResetUserPasswordPayload } from '@shared/events/notification/notification.payload';
import { AuthTokenType } from '../types/auth-token.type';

export const resetUserPasswordPayload = (
  authToken: AuthTokenType,
): ResetUserPasswordPayload => {
  const resetUserPassword = new ResetUserPasswordPayload();
  resetUserPassword.email = authToken.email;
  resetUserPassword.url = authToken.token;

  return resetUserPassword;
};
