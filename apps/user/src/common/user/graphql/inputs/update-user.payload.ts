import { InputType, Field } from '@nestjs/graphql';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';
import { validateNameWithJoi } from '@shared/validations/common/strings/name/name.validator';
import { validateAddressWithJoi } from '@shared/validations/entities/location/address/address.validator';
import { validateTelephoneNumberWithJoi } from '@shared/validations/entities/user/telephone-number/telephone-number.validator';
import * as joi from 'joi';
import { UserStatus } from '../enum/user-status.enum';

@InputType()
export class UpdateUserPayload {
  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field({ nullable: true })
  address?: string;

  status?: UserStatus;

  public static validationSchema = joi.object<UpdateUserPayload>({
    name: validateNameWithJoi,
    profilePicture: validateUrlWithJoi,
    lastName: validateNameWithJoi,
    telephoneNumber: validateTelephoneNumberWithJoi,
    address: validateAddressWithJoi
  });
}
