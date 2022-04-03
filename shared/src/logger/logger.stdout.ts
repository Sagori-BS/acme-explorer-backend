import { LoggerService } from '@nestjs/common';
import { LoggerOptions } from './logger.models';
import { LOGGER_FORMAT } from './logger.config';
import * as winston from 'winston';

export class ConsoleLogger implements LoggerService {
  private logger: winston.Logger;

  constructor(_options: LoggerOptions) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.Console({
          format: LOGGER_FORMAT,
        }),
      ],
    });
  }

  private loggerFormat(message: winston.Logform.TransformableInfo) {
    return `[${new Date().toLocaleString()}] [${message.level}] ${
      message.message
    }`;
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
