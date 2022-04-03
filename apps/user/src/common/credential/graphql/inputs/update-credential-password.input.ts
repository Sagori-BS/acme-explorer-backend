import { InputType, Field } from '@nestjs/graphql';
import { GetCredentialByIdOrEmailInput } from './get-credential-by-id-or-email.input';
import { UpdateCredentialPasswordPayload } from './update-credential-password.payload';
import * as joi from 'joi';
import { validateIdWithJoi } from '@shared/validations/common/mongo-id/id.validator';
import { validateEmailWithJoi } from '@user/validations/email/email.validator';

@InputType()
export class UpdateCredentialPasswordInput {
  @Field()
  where: GetCredentialByIdOrEmailInput;

  @Field()
  data: UpdateCredentialPasswordPayload;

  public static validationSchema = joi.object<UpdateCredentialPasswordInput>({
    where: {
      id: validateIdWithJoi,
      email: validateEmailWithJoi,
    },
    data: UpdateCredentialPasswordPayload.validationSchema.required(),
  });
}
