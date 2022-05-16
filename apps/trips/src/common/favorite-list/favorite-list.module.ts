import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FavoriteList,
  FavoriteListSchema
} from './database/favorite-list.entity';
import { FavoriteListRepository } from './favorite-list.repository';
import { FavoriteListResolver } from './favorite-list.resolver';
import { FavoriteListService } from './favorite-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: FavoriteList.name,
        schema: FavoriteListSchema
      }
    ])
  ],
  providers: [
    FavoriteListService,
    FavoriteListRepository,
    FavoriteListResolver
  ],
  exports: [MongooseModule]
})
export class FavoriteListModule {}
