import { BaseServiceType } from '@shared/data/interfaces/base-service-type.interface';
import { User } from '../../database/user.entity';
import { CreateUserInput } from '../../graphql/inputs/create-user.input';
import { UpdateUserInput } from '../../graphql/inputs/update-user.input';
import { UserRepository } from '../../user.repository';

export interface IUserServiceType extends BaseServiceType {
  entity: User;
  entityRepository: UserRepository;
  createEntityInput: CreateUserInput;
  updateEntityInput: UpdateUserInput;
}
