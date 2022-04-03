import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { EnvKey } from './config/env-key.enum';
import { AppNameEnum } from './shared/data/enums/app.enum';
import { FirebaseAdminModule } from './shared/firebase-admin';
import { getGcpLoggerConfigAsync } from './shared/logger/config/gcp-logger-module-async-config';
import { LoggerModule } from './shared/logger/logger.module';
import * as admin from 'firebase-admin';
import { UserModule } from './user/user.module';
import { CredentialModule } from './credential/credential.module';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { AuthTokenModule } from './auth-token/auth-token.module';
import { GraphQLModule } from '@nestjs/graphql';
import { gqlErrorFormatter } from './shared/errors/utils/gql-error-formatter.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.env`
    }),
    LoggerModule.registerAsync(getGcpLoggerConfigAsync()),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const dbUri = configService.get(EnvKey.MONGO_DB_URI);

        return {
          uri: dbUri,
          useNewUrlParser: true,
          useUnifiedTopology: true
        };
      }
    }),
    FirebaseAdminModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const defaultServiceAccount = JSON.parse(
          configService.get(EnvKey.GOOGLE_SERVICE_ACCOUNT)
        );

        return [
          {
            appName: AppNameEnum.DEFAULT,
            options: {
              credential: admin.credential.cert(defaultServiceAccount)
            }
          }
        ];
      }
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers }),
      formatError: gqlErrorFormatter
    }),
    UserModule,
    AuthTokenModule,
    CredentialModule,
    AuthModule,
    RefreshTokenModule
  ]
})
export class AppModule {}
