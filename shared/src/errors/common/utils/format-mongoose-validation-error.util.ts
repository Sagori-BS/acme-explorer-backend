import { IErrorDetail } from '../../base-error.abstract';
import { Error as MongooseErrors } from 'mongoose';

const skipPath = {
  slug: true,
};

/**
 * Takes an instance of mongoose.Error.ValidationError and converts it into an IErrorDetail[]
 *
 * @param {mongoose.Error.ValidationError} error
 * @returns {IErrorDetail[]}
 *
 */
export const formatMongooseValidationError = (
  error: MongooseErrors.ValidationError,
): IErrorDetail[] => {
  if (!error) {
    return [];
  }

  const paths = Object.keys(error.errors);
  const errors: IErrorDetail[] = [];

  for (const path of paths) {
    if (skipPath[path]) continue;

    const currErr = error.errors[path];

    const errorDetail: IErrorDetail = {
      field: path,
      message: currErr.message,
    };

    errors.push(errorDetail);
  }

  return errors;
};
