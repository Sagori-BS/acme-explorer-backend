import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  EXPLORER = 'explorer',
  MANAGER = 'manager',
  ADMIN = 'admin',
  SPONSOR = 'sponsor'
}

registerEnumType(UserRoles, {
  name: 'UserRoles'
});
