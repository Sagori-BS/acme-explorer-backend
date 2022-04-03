import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RefreshToken,
  RefreshTokenSchema
} from './database/refresh-token.entity';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RefreshToken.name,
        schema: RefreshTokenSchema
      }
    ])
  ],
  providers: [RefreshTokenService, RefreshTokenRepository],
  exports: [MongooseModule, RefreshTokenService, RefreshTokenRepository]
})
export class RefreshTokenModule {}
