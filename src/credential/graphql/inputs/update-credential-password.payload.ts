import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { InputType, Field } from '@nestjs/graphql';
import { validatePasswordWithJoi } from 'apps/user/src/validation/password/password.validator';
import * as joi from 'joi';

@InputType()
export class UpdateCredentialPasswordPayload extends ValidationInput {
  @Field()
  password: string;

  oldPassword?: string;

  public static validationSchema = joi.object<UpdateCredentialPasswordPayload>({
    password: validatePasswordWithJoi.required()
  });
}
