import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateStringWithJoi } from '@common/common/validations/data-types/string/string.validator';
import { validateEmailWithJoi } from '@common/common/validations/entities/user/email/email.validator';
import { InputType, Field } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class CreateAuthTokenInput extends ValidationInput {
  @Field()
  email: string;

  @Field()
  origin: string;

  public static validationSchema = joi.object<CreateAuthTokenInput>({
    email: validateEmailWithJoi.required(),
    origin: validateStringWithJoi.required()
  });
}
