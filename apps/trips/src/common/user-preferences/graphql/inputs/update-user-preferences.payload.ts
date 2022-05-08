import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateIdsWithJoi } from '@common/common/validations/common/identification/mongo-ids/ids.validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class UpdateUserPreferencesPayload extends ValidationInput {
  @Field(() => [ID])
  trips: string[];

  public static validationSchema = joi.object<UpdateUserPreferencesPayload>({
    trips: validateIdsWithJoi.required()
  });
}
