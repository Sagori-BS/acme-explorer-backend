import { CustomExceptionsFilter } from '@common/common/errors/exception-filters/custom.exception-filter';
import { HttpExceptionHandler } from '@common/common/errors/http-exception-handler';
import { LoggerService } from '@common/common/logger/logger.service';
import { PUB_SUB_CLIENT_TOKEN } from '@common/common/microservices/pub-sub/constants/pub-sub-client.constants';
import { PubSubClient } from '@common/common/microservices/pub-sub/pub-sub-client';
import { GoogleCloudPubSubServer } from '@common/common/microservices/pub-sub/pub-sub-server';
import { MongoSanitizeInterceptor } from '@common/common/mongo/interceptors/mongo-sanitize.interceptor';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvKey } from './config/env-key.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);

  app.useLogger(loggerService);

  app.useGlobalInterceptors(new MongoSanitizeInterceptor());

  app.useGlobalFilters(
    new CustomExceptionsFilter(loggerService, new HttpExceptionHandler()),
  );

  const pubSubClient: PubSubClient = app.get(PUB_SUB_CLIENT_TOKEN);

  const configService: ConfigService = app.get(ConfigService);

  app.connectMicroservice({
    strategy: new GoogleCloudPubSubServer(pubSubClient),
  });

  await app.startAllMicroservices();
  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();