import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateEmailWithJoi } from '@user/validations/email/email.validator';
import { validatePasswordWithJoi } from '@user/validations/password/password.validator';
import { InputType, Field } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType('SignInUserInput')
export class CreateCredentialInput extends ValidationInput {
  @Field()
  email: string;

  @Field()
  password: string;

  public static validationSchema = joi.object<CreateCredentialInput>({
    email: validateEmailWithJoi.required(),
    password: validatePasswordWithJoi.required(),
  });
}
