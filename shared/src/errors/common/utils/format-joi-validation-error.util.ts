import { IErrorDetail } from '../../base-error.abstract';
import * as joi from 'joi';
import { capitalize } from '@shared/functions/text/capitalize';

/**
 * Takes an instance of joi.ValidationError and converts it into an IErrorDetail[]
 *
 * @param {joi.ValidationError} error
 * @returns {IErrorDetail[]}
 *
 */
export const formatJoiValidationError = (
  error: joi.ValidationError,
): IErrorDetail[] => {
  if (!error) {
    return [];
  }

  const paths = Object.keys(error.details);
  const errors: IErrorDetail[] = [];

  for (const path of paths) {
    const currErr = error.details[path];
    const errorDetail: IErrorDetail = {
      field: currErr.message.split('"')[1],
      message: capitalize(
        currErr.message.replace(`"${currErr.message.split('"')[1]}" `, ''),
      ),
    };

    errors.push(errorDetail);
  }

  return errors;
};
