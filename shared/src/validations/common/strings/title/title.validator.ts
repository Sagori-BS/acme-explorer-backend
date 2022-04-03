import { IDatabaseValidator } from "@shared/data/interfaces/database-validator.interface";
import { errorMessageBuilder } from "../../../error-message-builder";
import * as joi from "joi";

export const _validateTitle = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return value.length >= 2 && value.length <= 500;
};

export const validateTitle: IDatabaseValidator = {
  validator: _validateTitle,
  message: errorMessageBuilder,
};

export const validateTitleWithJoi = joi
  .string()
  .min(2)
  .max(500);
