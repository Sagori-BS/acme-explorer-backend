import { _validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';

export const isObject = (input: any): boolean => {
  if (input === undefined || input === null) {
    return false;
  }

  // Checks if the object is a mongo objectId
  if (_validateId(input)) {
    return false;
  }

  return typeof input === 'object';
};
