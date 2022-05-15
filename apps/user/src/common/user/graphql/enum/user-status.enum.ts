import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  UNLOCK = 'UNLOCK',
  LOCK = 'LOCK'
}

registerEnumType(UserStatus, {
  name: 'UserStatus'
});
