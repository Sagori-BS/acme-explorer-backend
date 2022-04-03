import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerAsyncOptions, LoggerOptions } from './logger.models';
import { LOGGER_OPTIONS_TOKEN } from './constants/logger.constants';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {
  static register(options: LoggerOptions): DynamicModule {
    return {
      module: LoggerModule,
      global: options.isGlobal,
      providers: [
        {
          provide: LOGGER_OPTIONS_TOKEN,
          useValue: options,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }

  static async registerAsync(
    options: LoggerAsyncOptions,
  ): Promise<DynamicModule> {
    const { isGlobal = false, useFactory, inject = [] } = options;

    return {
      module: LoggerModule,
      global: isGlobal,
      providers: [
        {
          provide: LOGGER_OPTIONS_TOKEN,
          inject,
          useFactory,
        },
        LoggerService,
      ],
      exports: [LoggerService],
    };
  }
}
