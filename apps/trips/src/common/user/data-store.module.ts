import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '@common/common/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@common/common/auth/guards/global-jwt-auth-and-roles.guard';
import { DataStore, DataStoreSchema } from './database/application.entity';
import { DataStoreRepository } from './data-store.repository';
import { DataStoreResolver } from './data-store.resolver';
import { DataStoreService } from './data-store.service';

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
