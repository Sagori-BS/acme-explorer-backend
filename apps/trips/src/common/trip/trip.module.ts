import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { Trip, TripSchema } from './database/trip.entity';
import { TripRepository } from './trip.repository';
import { TripResolver } from './trip.resolver';
import { TripService } from './trip.service';

@Module({
  imports: [
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
  exports: [MongooseModule]
})
export class TripModule {}
