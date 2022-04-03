import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { Model } from 'mongoose';
import { RefreshToken } from '../../database/refresh-token.entity';
import { CreateRefreshTokenInput } from '../../graphql/inputs/create-refresh-token.input';
import { UpdateRefreshTokenInput } from '../../graphql/inputs/update-refresh-token.input';

export interface IRefreshTokenRepositoryType extends BaseRepositoryType {
  entity: RefreshToken;
  entityModel: Model<RefreshToken>;
  createEntityInput: CreateRefreshTokenInput;
  updateEntityInput: UpdateRefreshTokenInput;
}
