import { validateJWTWithJoi } from '@common/common/validations/entities/token/token.validator';
import { Field, InputType } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class RefreshAccessTokenInput {
  @Field()
  refreshToken: string;

  public static validationSchema = joi.object<RefreshAccessTokenInput>({
    refreshToken: validateJWTWithJoi.required()
  });
}
