import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvKey } from './config/env-key.enum';
import { CustomExceptionsFilter } from './shared/errors/exception-filters/custom.exception-filter';
import { HttpExceptionHandler } from './shared/errors/http-exception-handler';
import { LoggerService } from './shared/logger/logger.service';
import { MongoSanitizeInterceptor } from './shared/mongo/interceptors/mongo-sanitize.interceptor';
import { JoiValidationPipe } from './shared/pipes/joi-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerService = app.get(LoggerService);

  app.useLogger(loggerService);

  app.useGlobalInterceptors(new MongoSanitizeInterceptor());

  app.useGlobalFilters(
    new CustomExceptionsFilter(loggerService, new HttpExceptionHandler())
  );

  app.useGlobalPipes(new JoiValidationPipe());

  const configService: ConfigService = app.get(ConfigService);

  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();
