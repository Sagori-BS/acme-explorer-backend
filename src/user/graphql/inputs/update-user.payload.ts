import { InputType, Field } from '@nestjs/graphql';
import { validateUrlWithJoi } from '@common/common/validations/common/internet/url/url.validator';
import { validateTelephoneNumberWithJoi } from '@common/common/validations/entities/user/telephone-number/telephone-number.validator';
import { validateAddressWithJoi } from '@common/common/validations/entities/location/address/address.validator';
import { validateNameWithJoi } from '@common/common/validations/common/strings/name/name.validator';
import * as joi from 'joi';
import { validateUserRolesWithJoi } from '@common/common/validations/entities/user/user-roles/user-roles.validator';
import { UserRoles } from '@common/common/auth/enums/user-roles.enum';

@InputType()
export class UpdateUserPayload {
  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => [UserRoles], { nullable: true })
  roles?: UserRoles[];

  public static validationSchema = joi
    .object<UpdateUserPayload>({
      name: validateNameWithJoi,
      lastName: validateNameWithJoi,
      telephoneNumber: validateTelephoneNumberWithJoi,
      address: validateAddressWithJoi,
      profilePicture: validateUrlWithJoi,
      roles: validateUserRolesWithJoi
    })
    .min(1);
}
