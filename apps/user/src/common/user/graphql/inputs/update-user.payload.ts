import { InputType, Field } from '@nestjs/graphql';
import { validateUrlWithJoi } from '@shared/validations/common/internet/url/url.validator';
import { validateNameWithJoi } from '@shared/validations/common/strings/name/name.validator';
import * as joi from 'joi';

@InputType()
export class UpdateUserPayload {
  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  name?: string;

  public static validationSchema = joi.object<UpdateUserPayload>({
    name: validateNameWithJoi,
    profilePicture: validateUrlWithJoi,
  });
}
