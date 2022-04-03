import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateStringWithJoi } from '@common/common/validations/data-types/string/string.validator';
import { validateTokenWithJoi } from '@common/common/validations/entities/token/token.validator';
import { validatePasswordWithJoi } from 'apps/user/src/validation/password/password.validator';
import { InputType, Field } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class ValidateAuthTokenInput extends ValidationInput {
  @Field()
  token: string;

  @Field({ nullable: true })
  password?: string;

  @Field()
  origin: string;

  public static validationSchema = joi.object<ValidateAuthTokenInput>({
    token: validateTokenWithJoi.required(),
    origin: validateStringWithJoi.required(),
    password: validatePasswordWithJoi
  });
}
