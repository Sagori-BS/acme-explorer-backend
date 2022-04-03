import { LoggerService } from '@nestjs/common';
import { LoggerOptions } from './logger.models';
import { LoggingWinston } from '@google-cloud/logging-winston';

import * as winston from 'winston';
import { LOGGER_FORMAT } from './logger.config';

export interface GCPOptions {
  projectId: string;
  keyFilename: string;
  credentials?: GCPCrendentialOptions;
}

export interface GCPCrendentialOptions {
  client_email?: string;
  private_key?: string;
}

export class GCPLogger implements LoggerService {
  private logger: winston.Logger;

  constructor(options: LoggerOptions) {
    const { keyFilename, projectId, credentials } = options.GCPOptions;

    const gcpLoggerOptions = credentials
      ? { projectId, credentials }
      : { keyFilename, projectId };

    const loggingWinston = new LoggingWinston(gcpLoggerOptions);

    this.logger = winston.createLogger({
      transports: [
        loggingWinston,
        new winston.transports.Console({
          format: LOGGER_FORMAT,
        }),
      ],
    });
  }

  log(message: any, _context?: string) {
    this.logger.log(message);
  }
  error(message: any, _trace?: string, _context?: string) {
    this.logger.log(message);
  }
  warn(message: any, _context?: string) {
    this.logger.log(message);
  }
  debug?(message: any, _context?: string) {
    this.logger.log(message);
  }
  verbose?(message: any, _context?: string) {
    this.logger.log(message);
  }
}
