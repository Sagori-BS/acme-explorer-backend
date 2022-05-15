import { Repository } from '@shared/data/classes/repository.class';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Configuration } from './database/configuration.entity';
import { IConfigurationRepositoryType } from './interfaces/types/common-type.interface';

@Injectable()
export class ConfigurationRepository extends Repository<
  IConfigurationRepositoryType
> {
  constructor(
    @InjectModel(Configuration.name)
    private readonly configurationModel: Model<Configuration>
  ) {
    super(configurationModel, Configuration.name);
  }
}
