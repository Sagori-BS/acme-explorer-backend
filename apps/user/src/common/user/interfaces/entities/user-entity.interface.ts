import { UserRoles } from '@shared/auth/enums/user-roles.enum';

export interface IUser {
  id: string;
  profilePicture: string;
  name: string;
  lastName: string;
  role: UserRoles;
  telephoneNumber?: string;
  address?: string;
  email: string;
}
