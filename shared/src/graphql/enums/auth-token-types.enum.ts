import { registerEnumType } from '@nestjs/graphql';

export enum AuthTokenTypes {
  CONFIRM_ACCOUNT = 'confirm-account',
  RESET_PASSWORD = 'reset-password',
}

registerEnumType(AuthTokenTypes, {
  name: 'AuthTokenTypes',
});
