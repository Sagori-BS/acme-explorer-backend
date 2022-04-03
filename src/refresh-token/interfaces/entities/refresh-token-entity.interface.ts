export interface IRefreshToken {
  id: string;
  user: string;
  isRevoked: boolean;
  expiresIn: string;
  updatedAt: string;
  createdAt: string;
}
