import { getGcpLoggerConfigAsync } from '@shared/logger/config/gcp-logger-module-async-config';
import { LoggerModule } from '@shared/logger/logger.module';
import { getPubSubModuleAsyncConfig } from '@shared/microservices/pub-sub/config/pub-sub-module-async-config';
import { PubSubClientModule } from '@shared/microservices/pub-sub/pub-sub.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validator';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.upload.env`,
      validationSchema: validateEnv
    }),
    LoggerModule.registerAsync(getGcpLoggerConfigAsync()),
    PubSubClientModule.registerAsync(getPubSubModuleAsyncConfig('upload')),
    UploadModule
  ]
})
export class AppModule {}
