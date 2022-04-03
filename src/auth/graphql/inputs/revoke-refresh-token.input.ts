import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateIdWithJoi } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class RevokeRefreshTokenInput extends ValidationInput {
  @Field(_type => ID)
  user: string;

  public static validationSchema = joi.object<RevokeRefreshTokenInput>({
    user: validateIdWithJoi.required()
  });
}
