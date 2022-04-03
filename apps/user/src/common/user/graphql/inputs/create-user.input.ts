import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateNameWithJoi } from '@shared/validations/common/strings/name/name.validator';
import * as joi from 'joi';
import { Field, InputType } from '@nestjs/graphql';
import {
  AuthProviders,
  AuthType,
} from 'apps/user/src/common/auth/utils/auth-providers.enum';
import { validateEmailWithJoi } from '@user/validations/email/email.validator';
import { validatePasswordWithJoi } from '@user/validations/password/password.validator';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';
import { validateUserRoleWithJoi } from '@user/validations/user-role/user-role.validator';

@InputType()
export class CreateUserInput extends ValidationInput {
  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  name: string;

  @Field()
  password: string;

  @Field(_type => UserRoles)
  role: UserRoles;

  @Field()
  email: string;

  socialProvider: AuthProviders.Local;

  authType: AuthType.PASSWORD;

  public static validationSchema = joi.object<CreateUserInput>({
    name: validateNameWithJoi.required(),
    email: validateEmailWithJoi.required(),
    role: validateUserRoleWithJoi.required(),
    profilePicture: validateUrlWithJoi,
    password: validatePasswordWithJoi.required(),
  });
}
