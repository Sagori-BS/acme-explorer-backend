import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { InputType, Field } from '@nestjs/graphql';
import { validatePasswordWithJoi } from '@user/validations/password/password.validator';
import * as joi from 'joi';

@InputType()
export class UpdateCredentialPasswordPayload extends ValidationInput {
  @Field()
  password: string;

  oldPassword?: string;

  public static validationSchema = joi.object<UpdateCredentialPasswordPayload>({
    password: validatePasswordWithJoi.required(),
  });
}
