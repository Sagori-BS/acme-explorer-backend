import { customAlphabet } from 'nanoid';

/**
 * Generates a random ticket number
 * @returns {string}
 *
 * @example
 * generateTicket()
 * => '200501-AFEG'
 *
 *
 **/
export const generateTicket = (): string =>
  `${generateDateFromString()}-${generateId()}`;

export const generateId = (): string =>
  customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)();

/**
 *
 * @function const generateDateFromString - Generates a date from a string
 *
 * example:
 * 2020-05-01
 * result: 200501
 * @returns {string} with this format: 200501
 *
 */
export const generateDateFromString = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dayString = day < 10 ? `0${day}` : day;
  const monthString = month < 10 ? `0${month}` : month;

  return `${year.toString().substring(2, 4)}${monthString}${dayString}`;
};
