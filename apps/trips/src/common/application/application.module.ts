import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
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
  providers: [
    ApplicationService,
    ApplicationRepository,
    ApplicationResolver,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard
  ],
  exports: [MongooseModule, ApplicationService, ApplicationRepository]
})
export class ApplicationModule {}
