import { customAlphabet } from 'nanoid';
import dateFormat from 'dateformat';

export const generateTicket = (): string =>
  `${generateDateFromString()}-${generateId()}`;

export const generateId = (): string =>
  customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)();

export const generateDateFromString = (): string =>
  dateFormat(new Date(), 'yymmdd');
