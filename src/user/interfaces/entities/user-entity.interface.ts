import { UserRoles } from '@common/common/auth/enums/user-roles.enum';

export interface IUser {
  id: string;
  profilePicture: string;
  name: string;
  lastName: string;
  telephoneNumber: string;
  address: string;
  email: string;
  roles: UserRoles[];
}
