import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { Field, InputType } from '@nestjs/graphql';
import { validateBooleanWithJoi } from '@common/common/validations/data-types/boolean/boolean.validator';
import * as joi from 'joi';

@InputType()
export class UpdateRefreshTokenPayload extends ValidationInput {
  @Field()
  isRevoked: boolean;

  public static validationSchema = joi.object<UpdateRefreshTokenPayload>({
    isRevoked: validateBooleanWithJoi.required()
  });
}
