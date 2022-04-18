import { CustomExceptionsFilter } from '@shared/errors/exception-filters/custom.exception-filter';
import { HttpExceptionHandler } from '@shared/errors/http-exception-handler';
import { LoggerService } from '@shared/logger/logger.service';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { PubSubClient } from '@shared/microservices/pub-sub/pub-sub-client';
import { GoogleCloudPubSubServer } from '@shared/microservices/pub-sub/pub-sub-server';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MongoSanitizeInterceptor } from '@shared/mongo/interceptors/mongo-sanitize.interceptor';
import { AppModule } from './app.module';
import { EnvKey } from './config/env-key.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);

  app.useLogger(loggerService);

  app.enableCors();

  app.useGlobalInterceptors(new MongoSanitizeInterceptor());

  app.useGlobalFilters(
    new CustomExceptionsFilter(loggerService, new HttpExceptionHandler())
  );

  const pubSubClient: PubSubClient = app.get(PUB_SUB_CLIENT_TOKEN);

  const configService: ConfigService = app.get(ConfigService);

  app.connectMicroservice({
    strategy: new GoogleCloudPubSubServer(pubSubClient)
  });

  await app.startAllMicroservices();
  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();
