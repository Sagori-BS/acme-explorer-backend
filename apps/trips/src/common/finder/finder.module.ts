import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripModule } from '../trip/trip.module';
import { Finder, FinderSchema } from './database/finder.entity';
import { FinderRepository } from './finder.repository';
import { FinderResolver } from './finder.resolver';
import { FinderService } from './finder.service';

@Module({
  imports: [
    TripModule,
    MongooseModule.forFeature([
      {
        name: Finder.name,
        schema: FinderSchema
      }
    ])
  ],
  providers: [FinderService, FinderRepository, FinderResolver],
  exports: [MongooseModule, FinderService, FinderRepository]
})
export class FinderModule {}
