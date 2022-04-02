import { IDatabaseValidator } from '@common/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../../error-message-builder';

import * as lookup from 'country-code-lookup';

export const _validateIsoCountryCode = (value: string): boolean => {
  if (!value || value.length !== 3) {
    return false;
  }

  try {
    lookup.byIso(value);
  } catch {
    return false;
  }

  return true;
};

export const validateIsoCountrycode: IDatabaseValidator = {
  validator: _validateIsoCountryCode,
  message: errorMessageBuilder
};
