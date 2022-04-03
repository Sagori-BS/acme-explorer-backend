import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthToken, AuthTokenSchema } from './database/auth-token.entity';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenRepository } from './auth-token.repository';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    forwardRef(() => CredentialModule),
    MongooseModule.forFeature([
      {
        name: AuthToken.name,
        schema: AuthTokenSchema,
      },
    ]),
  ],
  providers: [AuthTokenService, AuthTokenRepository],
  exports: [AuthTokenService, MongooseModule],
})
export class AuthTokenModule {}
