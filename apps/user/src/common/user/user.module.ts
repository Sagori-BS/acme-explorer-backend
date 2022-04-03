import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/user.entity';
import { UserRepository } from './user.repository';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { AuthTokenModule } from '../auth-token/auth-token.module';
import { JwtStrategy } from '@shared/auth/strategies/jwt.strategy';
import { GlobalJwtAuthAndRolesGuard } from '@shared/auth/guards/global-jwt-auth-and-roles.guard';
import { CredentialModule } from '../credential/credential.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => AuthTokenModule),
    CredentialModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    UserResolver,
    UserService,
    UserRepository,
    JwtStrategy,
    ...GlobalJwtAuthAndRolesGuard,
  ],
  exports: [MongooseModule, UserService, UserRepository],
})
export class UserModule {}
