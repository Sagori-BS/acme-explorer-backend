import { BaseRepositoryType } from '@shared/data/interfaces/base-repository-type.interface';
import { Model } from 'mongoose';
import { User } from '../../database/user.entity';
import { CreateUserInput } from '../../graphql/inputs/create-user.input';
import { UpdateUserInput } from '../../graphql/inputs/update-user.input';

export interface IUserRepositoryType extends BaseRepositoryType {
  entity: User;
  entityModel: Model<User>;
  createEntityInput: CreateUserInput;
  updateEntityInput: UpdateUserInput;
}
