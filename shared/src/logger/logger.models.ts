import { GCPOptions } from './logger.gcp';

export interface ILoggerService {
  log: (message: any, _context?: string) => void;
  error: (message: any, _trace?: string, _context?: string) => void;
  warn: (message: any, _context?: string) => void;
  debug?: (message: any, _context?: string) => void;
  verbose?: (message: any, _context?: string) => void;
}

export interface LoggerOptions {
  isGlobal?: boolean;
  destination: LoggerDestination;
  GCPOptions?: GCPOptions;
  inject?: any[];
}

export interface LoggerAsyncOptions {
  useFactory?: (...args: any[]) => Promise<LoggerOptions> | LoggerOptions;
  isGlobal?: boolean;
  inject?: any[];
}

export enum LoggerDestination {
  GCP,
  STD_OUT,
}

export interface ConcreteLogger {
  error(message: any, trace?: string, context?: string): void;
  log(message: any, context?: string): void;
  warn(message: any, context?: string): void;
  debug?(message: any, context?: string): void;
  verbose?(message: any, context?: string): void;
}
