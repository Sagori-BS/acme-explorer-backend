import { _validateId } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { Types } from 'mongoose';

export const convertIdToObjectId = (input: string): Types.ObjectId | any => {
  if (_validateId(input)) {
    return new Types.ObjectId(input);
  }

  return input;
};
