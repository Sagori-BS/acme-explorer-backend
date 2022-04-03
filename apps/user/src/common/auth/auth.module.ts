import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { CredentialModule } from '../credential/credential.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthTokenModule } from '../auth-token/auth-token.module';
import { AuthResolver } from './auth.resolver';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { TokensService } from './tokens.service';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    CredentialModule,
    AuthTokenModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    AuthRepository,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    TokensService,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
