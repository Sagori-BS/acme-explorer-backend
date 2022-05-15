import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationRepository } from './configuration.repository';
import { ConfigurationResolver } from './configuration.resolver';
import { ConfigurationService } from './configuration.service';
import {
  Configuration,
  ConfigurationSchema
} from './database/configuration.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Configuration.name,
        schema: ConfigurationSchema
      }
    ])
  ],
  providers: [
    ConfigurationService,
    ConfigurationRepository,
    ConfigurationResolver
  ],
  exports: [MongooseModule, ConfigurationService, ConfigurationRepository]
})
export class ConfigurationModule {}
