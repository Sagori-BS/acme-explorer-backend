import { registerEnumType } from '@nestjs/graphql';

export enum UserRoles {
  ADMIN = 'admin',
  EXPLORER = 'explorer',
  SPONSOR = 'sponsor',
  MANAGER = 'manager'
}

registerEnumType(UserRoles, {
  name: 'UserRoles'
});
