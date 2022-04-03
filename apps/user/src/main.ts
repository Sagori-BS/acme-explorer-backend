import { MongoSanitizeInterceptor } from '@shared/mongo/interceptors/mongo-sanitize.interceptor';
import { LoggerService } from '@shared/logger/logger.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GoogleCloudPubSubServer } from '@shared/microservices/pub-sub/pub-sub-server';
import { PubSubClient } from '@shared/microservices/pub-sub/pub-sub-client';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from './config/env-key.enum';
import { CustomExceptionsFilter } from '@shared/errors/exception-filters/custom.exception-filter';
import { HttpExceptionHandler } from '@shared/errors/http-exception-handler';
import { JoiValidationPipe } from '@shared/pipes/joi-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const loggerService = app.get(LoggerService);

  app.useLogger(loggerService);

  app.useGlobalInterceptors(new MongoSanitizeInterceptor());

  app.useGlobalFilters(
    new CustomExceptionsFilter(loggerService, new HttpExceptionHandler())
  );

  app.useGlobalPipes(new JoiValidationPipe());

  const pubSubClient: PubSubClient = app.get(PUB_SUB_CLIENT_TOKEN);

  const configService: ConfigService = app.get(ConfigService);

  app.connectMicroservice({
    strategy: new GoogleCloudPubSubServer(pubSubClient)
  });

  app.startAllMicroservices();

  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();
