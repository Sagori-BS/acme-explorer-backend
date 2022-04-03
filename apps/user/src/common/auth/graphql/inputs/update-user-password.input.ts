import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validatePasswordWithJoi } from '@user/validations/password/password.validator';
import { Field, InputType } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class UpdateUserPasswordInput extends ValidationInput {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;

  email?: string;

  userId?: string;

  public static validationSchema = joi.object<UpdateUserPasswordInput>({
    oldPassword: validatePasswordWithJoi.required(),
    newPassword: validatePasswordWithJoi.required(),
  });
}
