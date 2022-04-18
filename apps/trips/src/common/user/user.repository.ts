import { Repository } from '@common/common/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './database/user.entity';
import { UserRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class UserRepository extends Repository<UserRepositoryType> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {
    super(userModel, User.name);
  }
}
