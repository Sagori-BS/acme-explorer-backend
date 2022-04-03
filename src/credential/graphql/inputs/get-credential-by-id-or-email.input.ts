import { InputType, Field } from '@nestjs/graphql';
import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import * as joi from 'joi';
import { validateIdWithJoi } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { validateEmailWithJoi } from '@common/common/validations/entities/user/email/email.validator';

@InputType()
export class GetCredentialByIdOrEmailInput extends ValidationInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  email?: string;

  public static validationSchema = joi
    .object<GetCredentialByIdOrEmailInput>({
      id: validateIdWithJoi,
      email: validateEmailWithJoi
    })
    .or('id', 'email');
}
