import { CommonEnvKey } from '@shared/config/common-env-key.enum';
import { ConfigService } from '@nestjs/config';
import {
  LoggerAsyncOptions,
  LoggerDestination,
  LoggerOptions,
} from '../logger.models';

export const getGcpLoggerConfigAsync = (): LoggerAsyncOptions => {
  return {
    isGlobal: true,
    inject: [ConfigService],
    useFactory: (configService: ConfigService): LoggerOptions => {
      const credential = configService.get(
        CommonEnvKey.GOOGLE_LOGGER_CREDENTIAL,
      );
      const parsedCredentials = credential ? JSON.parse(credential) : null;

      return {
        destination: LoggerDestination.GCP,
        GCPOptions: {
          projectId: configService.get(CommonEnvKey.GOOGLE_PROJECT_ID),
          keyFilename: configService.get(CommonEnvKey.GOOGLE_API_JSON_PATH),
          credentials: parsedCredentials,
        },
      };
    },
  };
};
