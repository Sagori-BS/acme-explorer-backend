import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@common/common/data/interfaces/base-service-type.interface';
import {
  CreatedUserPayload,
  UpdatedUserPayload
} from '@common/common/events/user/user.payload';
import { Model } from 'mongoose';
import { User } from '../../database/user.entity';
import { UserRepository } from '../../user.repository';

export interface UserRepositoryType extends BaseRepositoryType {
  entity: User;
  entityModel: Model<User>;
  createEntityInput: CreatedUserPayload;
  updateEntityInput: UpdatedUserPayload;
}

export interface IUserServiceType extends BaseServiceType {
  entity: User;
  entityRepository: UserRepository;
  createEntityInput: CreatedUserPayload;
  updateEntityInput: UpdatedUserPayload;
}
