import { IDatabaseValidator } from "@shared/data/interfaces/database-validator.interface";
import { errorMessageBuilder } from "../../../error-message-builder";
import { _validateUuid } from "./uuid.validator";

export const _validateNullableUuid = (value: string): boolean => {
  if (value === null) {
    return true;
  }

  return _validateUuid(value);
};

export const validateNullableUuid: IDatabaseValidator = {
  validator: _validateNullableUuid,
  message: errorMessageBuilder,
};
