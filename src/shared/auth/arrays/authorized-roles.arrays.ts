import { UserRoles } from '../enums/user-roles.enum';

export const EXPLORER = [UserRoles.ADMIN, UserRoles.EXPLORER];

export const MANAGER = [UserRoles.ADMIN, UserRoles.MANAGER];

export const SPONSOR = [UserRoles.ADMIN, UserRoles.SPONSOR];

export const ALL_UserRoles = [
  UserRoles.ADMIN,
  UserRoles.EXPLORER,
  UserRoles.SPONSOR,
  UserRoles.MANAGER
];
