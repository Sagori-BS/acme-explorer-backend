import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { InputType, Field } from '@nestjs/graphql';
import { validateBooleanWithJoi } from '@common/common/validations/data-types/boolean/boolean.validator';
import * as joi from 'joi';

@InputType()
export class UpdateCredentialPayload extends ValidationInput {
  @Field({ nullable: true })
  confirmed?: boolean;

  @Field({ nullable: true })
  blocked?: boolean;

  public static validationSchema = joi
    .object<UpdateCredentialPayload>({
      confirmed: validateBooleanWithJoi,
      blocked: validateBooleanWithJoi
    })
    .min(1);
}
