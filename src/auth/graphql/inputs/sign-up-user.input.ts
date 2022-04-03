import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateNameWithJoi } from '@common/common/validations/common/strings/name/name.validator';
import { validateTelephoneNumberWithJoi } from '@common/common/validations/entities/user/telephone-number/telephone-number.validator';
import { validateUrlWithJoi } from '@common/common/validations/common/internet/url/url.validator';
import { validateAddressWithJoi } from '@common/common/validations/entities/location/address/address.validator';
import { validateDocumentIdWithJoi } from '@common/common/validations/entities/user/document-id/document-id.validator';
import { validateDrivingLicenseWithJoi } from '@common/common/validations/entities/user/driving-license/driving-license.validator';
import { validateEmailWithJoi } from '@common/common/validations/entities/user/email/email.validator';
import { validatePasswordWithJoi } from 'apps/user/src/validation/password/password.validator';
import { InputType, Field } from '@nestjs/graphql';
import {
  AuthProviders,
  AuthType
} from 'apps/user/src/common/auth/utils/auth-providers.enum';
import * as joi from 'joi';

@InputType()
export class SignUpUserInput extends ValidationInput {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  documentId?: string;

  @Field({ nullable: true })
  drivingLicense?: string;

  socialProvider?: AuthProviders;

  authType?: AuthType;

  public static validationSchema = joi.object<SignUpUserInput>({
    name: validateNameWithJoi.required(),
    lastName: validateNameWithJoi.required(),
    email: validateEmailWithJoi.required(),
    password: validatePasswordWithJoi.required(),
    profilePicture: validateUrlWithJoi,
    telephoneNumber: validateTelephoneNumberWithJoi,
    address: validateAddressWithJoi,
    documentId: validateDocumentIdWithJoi,
    drivingLicense: validateDrivingLicenseWithJoi
  });
}
