import { Inject, Injectable } from '@nestjs/common';

import {
  LoggerDestination,
  LoggerOptions,
  ConcreteLogger,
  ILoggerService,
} from './logger.models';
import { GCPLogger } from './logger.gcp';
import { ConsoleLogger } from './logger.stdout';
import { LOGGER_OPTIONS_TOKEN } from './constants/logger.constants';

@Injectable()
export class LoggerService implements ILoggerService {
  private concreteLogger: ConcreteLogger;

  constructor(@Inject(LOGGER_OPTIONS_TOKEN) loggerOptions: LoggerOptions) {
    switch (loggerOptions.destination) {
      case LoggerDestination.GCP: {
        this.concreteLogger = new GCPLogger(loggerOptions);
        break;
      }
      case LoggerDestination.STD_OUT: {
        this.concreteLogger = new ConsoleLogger(loggerOptions);
        break;
      }
      default: {
        this.concreteLogger = new ConsoleLogger(loggerOptions);
        break;
      }
    }
  }

  log(message: any, _context?: string) {
    this.concreteLogger.log({ level: 'info', message });
  }
  error(message: any, _trace?: string, _context?: string) {
    this.concreteLogger.log({ level: 'error', message });
  }
  warn(message: any, _context?: string) {
    this.concreteLogger.log({ level: 'warn', message });
  }
  debug?(message: any, _context?: string) {
    this.concreteLogger.log({ level: 'debug', message });
  }
  verbose?(message: any, _context?: string) {
    this.concreteLogger.log({ level: 'verbose', message });
  }
}
