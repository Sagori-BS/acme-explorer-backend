import { AuthTokenTypes } from '@user/graphql/enums/auth-token-types.enum';

export type AuthTokenType = {
  id: string;
  email: string;
  origin: string;
  token: string;
  completed: boolean;
  type: AuthTokenTypes;
  version: number;
  updatedAt: string;
  createdAt: string;
};
