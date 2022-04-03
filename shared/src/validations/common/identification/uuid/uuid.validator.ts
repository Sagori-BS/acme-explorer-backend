import { IDatabaseValidator } from "@shared/data/interfaces/database-validator.interface";
import validator from "validator";
import { errorMessageBuilder } from "../../../error-message-builder";

export const _validateUuid = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return validator.isUUID(value);
};

export const validateUuid: IDatabaseValidator = {
  validator: _validateUuid,
  message: errorMessageBuilder,
};
