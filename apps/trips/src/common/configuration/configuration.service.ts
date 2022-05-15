import { Service } from '@shared/data/classes/service.class';
import { Injectable } from '@nestjs/common';
import { ConfigurationRepository } from './configuration.repository';
import { IConfigurationServiceType } from './interfaces/types/common-type.interface';

@Injectable()
export class ConfigurationService extends Service<IConfigurationServiceType> {
  constructor(
    private readonly configurationRepository: ConfigurationRepository
  ) {
    super(configurationRepository);
  }
}
