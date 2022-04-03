import * as winston from 'winston';

export const LOGGER_FORMAT = winston.format.combine(
  winston.format.colorize(),
  winston.format.simple(),

  winston.format.printf(message => loggerFormat(message)),
);

const loggerFormat = (message: winston.Logform.TransformableInfo) => {
  return `[${new Date().toLocaleString()}] [${message.level}] ${
    message.message
  }`;
};
