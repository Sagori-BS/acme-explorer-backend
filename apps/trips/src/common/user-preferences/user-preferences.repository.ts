import { Repository } from '@common/common/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreferences } from './database/user-preferences.entity';
import { IUserPreferencesRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class UserPreferencesRepository extends Repository<
  IUserPreferencesRepositoryType
> {
  constructor(
    @InjectModel(UserPreferences.name)
    private readonly userPreferencesModel: Model<UserPreferences>
  ) {
    super(userPreferencesModel, UserPreferences.name);
  }
}
