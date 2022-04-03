import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateEmailWithJoi } from '@common/common/validations/entities/user/email/email.validator';
import { Field, InputType } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class BlockUserInput extends ValidationInput {
  @Field()
  email: string;

  public static validationSchema = joi.object<BlockUserInput>({
    email: validateEmailWithJoi.required()
  });
}
