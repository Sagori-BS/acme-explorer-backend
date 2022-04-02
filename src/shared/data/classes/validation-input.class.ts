import { ObjectSchema } from 'joi';

export abstract class ValidationInput {
  static validationSchema: ObjectSchema<Record<string, any>>;
}
