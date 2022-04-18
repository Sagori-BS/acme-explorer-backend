import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '@common/common/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@common/common/auth/guards/global-jwt-auth-and-roles.guard';
import { DataStore, DataStoreSchema } from './database/application.entity';
import { DataStoreRepository } from './application.repository';
import { DataStoreResolver } from './application.resolver';
import { DataStoreService } from './application.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DataStore.name,
        schema: DataStoreSchema
      }
    ])
  ],
  providers: [
    DataStoreService,
    DataStoreRepository,
    DataStoreResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard
  ],
  exports: [MongooseModule]
})
export class DataStoreModule {}
