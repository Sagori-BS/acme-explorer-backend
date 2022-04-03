import { InputType, Field } from '@nestjs/graphql';
import { GetCredentialByIdOrEmailInput } from './get-credential-by-id-or-email.input';
import { UpdateCredentialPasswordPayload } from './update-credential-password.payload';
import * as joi from 'joi';

@InputType()
export class UpdateCredentialPasswordInput {
  @Field()
  where: GetCredentialByIdOrEmailInput;

  @Field()
  data: UpdateCredentialPasswordPayload;

  public static validationSchema = joi.object<UpdateCredentialPasswordInput>({
    where: GetCredentialByIdOrEmailInput.validationSchema.required(),
    data: UpdateCredentialPasswordPayload.validationSchema.required()
  });
}
