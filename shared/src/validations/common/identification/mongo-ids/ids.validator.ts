import { IDatabaseValidator } from "@shared/data/interfaces/database-validator.interface";
import { errorMessageBuilder } from "../../../error-message-builder";
import { _validateId } from "../mongo-id/id.validator";
import * as joi from "joi";
import { CustomHelpers } from "joi";

export const _validateIds = (value: string[]): boolean => {
  if (!value) {
    return false;
  }

  if (value === []) {
    return true;
  }

  for (let i = 0; i < value.length; i++) {
    if (!_validateId(value[i])) {
      return false;
    }
  }

  return true;
};

export const validateIds: IDatabaseValidator = {
  validator: _validateIds,
  message: errorMessageBuilder,
};

const customIdValidator = (value: any, helpers: CustomHelpers) => {
  const condition = _validateIds(value);
  if (!condition) {
    return helpers.error("any.invalid");
  }
  return value;
};

export const validateIdsWithJoi = joi
  .array()
  .custom(customIdValidator, "ObjectId validator")
  .messages({ "any.invalid": '"id" Invalid ObjectId' });
