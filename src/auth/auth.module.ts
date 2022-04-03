import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { CredentialModule } from '../credential/credential.module';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthTokenModule } from '../auth-token/auth-token.module';
import { JwtStrategy } from '../../../../../libs/common/src/auth/strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { GlobalJwtAuthAndRolesGuard } from '@common/common/auth/guards/global-jwt-auth-and-roles.guard';
import { TokensService } from './tokens.service';
import { RoleModule } from '../role/role.module';
import { SocialLoginService } from './social-login.service';

@Module({
  imports: [
    RoleModule,
    forwardRef(() => UserModule),
    CredentialModule,
    AuthTokenModule,
    RefreshTokenModule,
    JwtModule.register({})
  ],
  providers: [
    AuthService,
    AuthRepository,
    LocalStrategy,
    JwtStrategy,
    AuthResolver,
    TokensService,
    SocialLoginService,
    ...GlobalJwtAuthAndRolesGuard
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}
