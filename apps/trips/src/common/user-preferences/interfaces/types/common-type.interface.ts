import { BaseRepositoryType } from '@common/common/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@common/common/data/interfaces/base-service-type.interface';
import { UserPreferences } from '../../database/user-preferences.entity';
import { UserPreferencesRepository } from '../../user-preferences.repository';
import { Model } from 'mongoose';

export interface IUserPreferencesRepositoryType extends BaseRepositoryType {
  entity: UserPreferences;
  entityModel: Model<UserPreferences>;
  createEntityInput: any;
  updateEntityInput: any;
}

export interface IUserPreferencesServiceType extends BaseServiceType {
  entity: UserPreferences;
  entityRepository: UserPreferencesRepository;
  createEntityInput: any;
  updateEntityInput: any;
}
