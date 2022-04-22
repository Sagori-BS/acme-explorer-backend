import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './database/trip.entity';
import { TripRepository } from './trip.repository';
import { TripResolver } from './trip.resolver';
import { TripService } from './trip.service';
import { ApplicationModule } from '../application/application.module';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => ApplicationModule),
    MongooseModule.forFeature([
      {
        name: Trip.name,
        schema: TripSchema
      }
    ])
  ],
  providers: [
    TripService,
    TripRepository,
    TripResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard
  ],
  exports: [MongooseModule, TripService, TripRepository]
})
export class TripModule {}
