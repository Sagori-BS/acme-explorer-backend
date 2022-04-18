import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { graphQLFederationOptions } from '@shared/graphql/modules/graphql-federation-options.config';
import { getGcpLoggerConfigAsync } from '@shared/logger/config/gcp-logger-module-async-config';
import { LoggerModule } from '@shared/logger/logger.module';
import { getPubSubModuleAsyncConfig } from '@shared/microservices/pub-sub/config/pub-sub-module-async-config';
import { PubSubClientModule } from '@shared/microservices/pub-sub/pub-sub.module';
import { ApplicationModule } from './common/application/application.module';
import { UserModule } from './common/user/user.module';
import { EnvKey } from './config/env-key.enum';
import { validateEnv } from './config/env.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.trips.env`,
      validationSchema: validateEnv
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
    GraphQLFederationModule.forRoot(graphQLFederationOptions),
    PubSubClientModule.registerAsync(getPubSubModuleAsyncConfig('trips')),
    ApplicationModule,
    UserModule
  ]
})
export class AppModule {}
