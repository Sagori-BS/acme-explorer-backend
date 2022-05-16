import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationModule } from '../application/application.module';
import { FinderModule } from '../finder/finder.module';
import { TripModule } from '../trip/trip.module';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([]),
    TripModule,
    ApplicationModule,
    FinderModule
  ],
  providers: [DashboardService, DashboardResolver],
  exports: [MongooseModule, DashboardService]
})
export class DashboardModule {}
