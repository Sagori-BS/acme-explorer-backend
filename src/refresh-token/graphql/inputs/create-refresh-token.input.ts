import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateIdWithJoi } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { validateIsoDateWithJoi } from '@common/common/validations/common/iso/iso-date/iso-date.validator';
import { InputType, Field, ID } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class CreateRefreshTokenInput extends ValidationInput {
  @Field(_type => ID)
  user: string;

  expiresIn?: string;

  public static validationSchema = joi.object<CreateRefreshTokenInput>({
    user: validateIdWithJoi.required(),
    expiresIn: validateIsoDateWithJoi
  });
}
