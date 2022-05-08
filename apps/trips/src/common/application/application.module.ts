import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './database/application.entity';
import { ApplicationRepository } from './application.repository';
import { ApplicationResolver } from './application.resolver';
import { ApplicationService } from './application.service';
import { TripModule } from '../trip/trip.module';

@Module({
  imports: [
    TripModule,
    MongooseModule.forFeature([
      {
        name: Application.name,
        schema: ApplicationSchema
      }
    ])
  ],
  providers: [ApplicationService, ApplicationRepository, ApplicationResolver],
  exports: [MongooseModule, ApplicationService, ApplicationRepository]
})
export class ApplicationModule {}
