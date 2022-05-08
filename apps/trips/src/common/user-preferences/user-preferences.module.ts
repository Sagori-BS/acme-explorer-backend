import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserPreferences,
  UserPreferencesSchema
} from './database/user-preferences.entity';
import { UserPreferencesRepository } from './user-preferences.repository';
import { UserPreferencesResolver } from './user-preferences.resolver';
import { UserPreferencesService } from './user-preferences.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UserPreferences.name,
        schema: UserPreferencesSchema
      }
    ])
  ],
  providers: [
    UserPreferencesService,
    UserPreferencesRepository,
    UserPreferencesResolver
  ],
  exports: [MongooseModule]
})
export class UserPreferencesModule {}
