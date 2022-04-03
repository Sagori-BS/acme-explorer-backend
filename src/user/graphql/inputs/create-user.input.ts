import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateNameWithJoi } from '@common/common/validations/common/strings/name/name.validator';
import * as joi from 'joi';
import { Field, ID, InputType } from '@nestjs/graphql';
import { validateEmailWithJoi } from '@common/common/validations/entities/user/email/email.validator';
import { validateTelephoneNumberWithJoi } from '@common/common/validations/entities/user/telephone-number/telephone-number.validator';
import { validateAddressWithJoi } from '@common/common/validations/entities/location/address/address.validator';
import { validateUrlWithJoi } from '@common/common/validations/common/internet/url/url.validator';
import { validateUserRolesWithJoi } from '@common/common/validations/entities/user/user-roles/user-roles.validator';
import { validatePasswordWithJoi } from '@common/common/validations/entities/user/password/password.validator';
import { AuthProviders, AuthType } from 'src/auth/utils/auth-providers.enum';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';

@InputType()
export class CreateUserInput extends ValidationInput {
  @Field({ nullable: true })
  profilePicture?: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field({ nullable: true })
  address?: string;

  @Field(() => [UserRoles])
  roles: UserRoles[];

  @Field()
  email: string;

  socialProvider: AuthProviders.Local;

  authType: AuthType.PASSWORD;

  public static validationSchema = joi.object<CreateUserInput>({
    name: validateNameWithJoi.required(),
    lastName: validateNameWithJoi.required(),
    email: validateEmailWithJoi.required(),
    password: validatePasswordWithJoi.required(),
    telephoneNumber: validateTelephoneNumberWithJoi,
    roles: validateUserRolesWithJoi.required(),
    address: validateAddressWithJoi,
    profilePicture: validateUrlWithJoi
  });
}
