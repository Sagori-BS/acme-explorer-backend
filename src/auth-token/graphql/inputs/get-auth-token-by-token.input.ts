import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateTokenWithJoi } from '@common/common/validations/entities/token/token.validator';
import { InputType, Field } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class GetAuthTokenByTokenInput extends ValidationInput {
  @Field()
  token: string;

  public static validationSchema = joi.object<GetAuthTokenByTokenInput>({
    token: validateTokenWithJoi.required()
  });
}
