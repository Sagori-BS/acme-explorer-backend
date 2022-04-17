import { Service } from '@common/common/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { IUserServiceType } from './interfaces/types/common-type.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends Service<IUserServiceType> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }
}
