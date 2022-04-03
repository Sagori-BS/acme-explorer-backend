import { FirebaseAdminModule } from '@user/firebase-admin/firebase-admin.module';
import { graphQLFederationOptions } from '@user/graphql/modules/graphql-federation-options.config';
import { getGcpLoggerConfigAsync } from '@shared/logger/config/gcp-logger-module-async-config';
import { LoggerModule } from '@shared/logger/logger.module';
import { getPubSubModuleAsyncConfig } from '@shared/microservices/pub-sub/config/pub-sub-module-async-config';
import { PubSubClientModule } from '@shared/microservices/pub-sub/pub-sub.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as admin from 'firebase-admin';
import { AuthTokenModule } from './common/auth-token/auth-token.module';
import { AuthModule } from './common/auth/auth.module';
import { CredentialModule } from './common/credential/credential.module';
import { UserModule } from './common/user/user.module';
import { EnvKey } from './config/env-key.enum';
import { validateEnv } from './config/env.validator';
import { FileModule } from './common/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.user.env`,
      validationSchema: validateEnv,
    }),
    LoggerModule.registerAsync(getGcpLoggerConfigAsync()),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const dbUri = configService.get(EnvKey.MONGO_DB_URI);

        return {
          uri: dbUri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
    GraphQLFederationModule.forRoot(graphQLFederationOptions),
    PubSubClientModule.registerAsync(getPubSubModuleAsyncConfig('user')),
    FirebaseAdminModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const serviceAccount = JSON.parse(
          configService.get(EnvKey.GOOGLE_SERVICE_ACCOUNT),
        );

        return {
          credential: admin.credential.cert(serviceAccount),
        };
      },
    }),
    UserModule,
    AuthTokenModule,
    CredentialModule,
    AuthModule,
    FileModule,
  ],
})
export class AppModule {}
