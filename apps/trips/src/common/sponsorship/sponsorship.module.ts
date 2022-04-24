import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { Sponsorship, SponsorshipSchema } from './database/sponsorship.entity';
import { SponsorshipRepository } from './sponsorship.repository';
import { SponsorshipResolver } from './sponsorship.resolver';
import { SponsorshipService } from './sponsorship.service';
import { TripModule } from '../trip/trip.module';

@Module({
  imports: [
    TripModule,
    MongooseModule.forFeature([
      {
        name: Sponsorship.name,
        schema: SponsorshipSchema
      }
    ])
  ],
  providers: [
    SponsorshipService,
    SponsorshipRepository,
    SponsorshipResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard
  ],
  exports: [MongooseModule, SponsorshipService, SponsorshipRepository]
})
export class SponsorshipModule {}
