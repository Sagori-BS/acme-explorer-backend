import { customAlphabet } from 'nanoid';

export const generateTicket = (): string =>
  `${generateDateFromString()}-${generateId()}`;

export const generateId = (): string =>
  customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)();

export const generateDateFromString = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayString = day < 10 ? `0${day}` : day;
  const monthString = month < 10 ? `0${month}` : month;

  return `${year.toString().substring(2, 4)}${monthString}${dayString}`;
};
