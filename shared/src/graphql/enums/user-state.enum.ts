import { registerEnumType } from '@nestjs/graphql';

export enum UserState {
  ACTIVE = 'confirm-account',
  INACTIVE = 'reset-password'
}

registerEnumType(UserState, {
  name: 'UserState'
});
