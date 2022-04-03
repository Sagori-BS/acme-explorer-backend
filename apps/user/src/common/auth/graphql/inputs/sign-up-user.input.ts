import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateNameWithJoi } from '@shared/validations/common/strings/name/name.validator';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';
import { validateEmailWithJoi } from '@user/validations/email/email.validator';
import { validatePasswordWithJoi } from '@user/validations/password/password.validator';
import { InputType, Field } from '@nestjs/graphql';
import {
  AuthProviders,
  AuthType,
} from 'apps/user/src/common/auth/utils/auth-providers.enum';
import * as joi from 'joi';

@InputType()
export class SignUpUserInput extends ValidationInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  socialProvider?: AuthProviders;

  authType?: AuthType;

  public static validationSchema = joi.object<SignUpUserInput>({
    name: validateNameWithJoi.required(),
    email: validateEmailWithJoi.required(),
    password: validatePasswordWithJoi.required(),
    profilePicture: validateUrlWithJoi,
  });
}
