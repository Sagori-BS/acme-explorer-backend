import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { AppModule } from './app.module';
import { EnvKey } from './config/env-key.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors();

  // app.use(
  //   '/profilePicture',
  //   createProxyMiddleware({
  //     target: configService.get(EnvKey.CLOUD_FUNCTION),
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/profilePicture': '',
  //     },
  //   }),
  // );

  await app.listen(configService.get(EnvKey.PORT));
}
bootstrap();
