import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { InputType, Field } from '@nestjs/graphql';
import { GetCredentialByIdOrEmailInput } from './get-credential-by-id-or-email.input';
import { UpdateCredentialPayload } from './update-credential.payload';
import * as joi from 'joi';
import { validateIdWithJoi } from '@shared/validations/common/mongo-id/id.validator';
import { validateEmailWithJoi } from '@user/validations/email/email.validator';

@InputType()
export class UpdateCredentialInput extends ValidationInput {
  @Field()
  where: GetCredentialByIdOrEmailInput;

  @Field()
  data: UpdateCredentialPayload;

  public static validationSchema = joi.object<UpdateCredentialInput>({
    where: {
      id: validateIdWithJoi,
      email: validateEmailWithJoi,
    },
    data: {
      confirmed: joi.boolean(),
      blocked: joi.boolean(),
    },
  });
}
