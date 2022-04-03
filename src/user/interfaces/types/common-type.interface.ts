import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@common/common/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { UserRepository } from 'src/user/user.repository';
import { User } from '../../database/user.entity';
import { CreateUserInput } from '../../graphql/inputs/create-user.input';
import { UpdateUserInput } from '../../graphql/inputs/update-user.input';

export interface IUserRepositoryType extends BaseRepositoryType {
  entity: User;
  entityModel: Model<User>;
  createEntityInput: CreateUserInput;
  updateEntityInput: UpdateUserInput;
}

export interface IUserServiceType extends BaseServiceType {
  entity: User;
  entityRepository: UserRepository;
  createEntityInput: CreateUserInput;
  updateEntityInput: UpdateUserInput;
}
