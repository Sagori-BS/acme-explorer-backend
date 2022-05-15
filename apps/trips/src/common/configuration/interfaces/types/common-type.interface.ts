import { BaseRepositoryType } from '@shared/data/interfaces/base-repository-type.interface';
import { BaseServiceType } from '@shared/data/interfaces/base-service-type.interface';
import { Model } from 'mongoose';
import { ConfigurationRepository } from '../../configuration.repository';
import { Configuration } from '../../database/configuration.entity';
import { CreateConfigurationInput } from '../../graphql/inputs/create-configuration.input';
import { UpdateConfigurationInput } from '../../graphql/inputs/update-configuration.input';

export interface IConfigurationRepositoryType extends BaseRepositoryType {
  entity: Configuration;
  entityModel: Model<Configuration>;
  createEntityInput: CreateConfigurationInput;
  updateEntityInput: UpdateConfigurationInput;
}

export interface IConfigurationServiceType extends BaseServiceType {
  entity: Configuration;
  entityRepository: ConfigurationRepository;
  createEntityInput: CreateConfigurationInput;
  updateEntityInput: UpdateConfigurationInput;
}
