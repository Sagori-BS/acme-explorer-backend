import { AuthTokenTypes } from '@common/common/graphql/enums/auth-token-types.enum';

export interface IAuthToken {
  id: string;
  email: string;
  origin: string;
  token: string;
  completed: boolean;
  type: AuthTokenTypes;
  updatedAt: string;
  createdAt: string;
}
