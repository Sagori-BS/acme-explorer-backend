import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateEmailWithJoi } from '@shared/validations/entities/user/email/email.validator';
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
    origin: joi.string().required()
  });
}
