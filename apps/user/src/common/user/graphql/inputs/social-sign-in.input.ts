import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { socialLoginValidatorWithJoi } from '@user/validations/social-login/social-login.validator';
import { Field, InputType } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class SocialSignInInput extends ValidationInput {
  @Field()
  token: string;

  public static validationSchema = joi.object<SocialSignInInput>({
    token: socialLoginValidatorWithJoi.required(),
  });
}
