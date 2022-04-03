import { _validateIds } from '@shared/validations/common/mongo-ids/ids.validator';
import { Types } from 'mongoose';

export const convertIdArrayToObjectIdArray = (
  input: string[],
): Types.ObjectId[] | any[] => {
  if (_validateIds(input)) {
    const ret = input.map(el => new Types.ObjectId(el));

    return ret;
  }

  return input;
};
