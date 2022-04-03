import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@shared/logger/logger.service';
import { PubSubClient } from '@shared/microservices/pub-sub/pub-sub-client';
import { GoogleCloudPubSubServer } from '@shared/microservices/pub-sub/pub-sub-server';
import { PUB_SUB_CLIENT_TOKEN } from '@shared/microservices/pub-sub/constants/pub-sub-client.constants';
import { ConfigService } from '@nestjs/config';
import { EnvKey } from './config/env-key.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(LoggerService));

  const pubSubClient: PubSubClient = app.get(PUB_SUB_CLIENT_TOKEN);

  const configService: ConfigService = app.get(ConfigService);

  app.connectMicroservice({
    strategy: new GoogleCloudPubSubServer(pubSubClient),
  });

  app.startAllMicroservices();
  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();
