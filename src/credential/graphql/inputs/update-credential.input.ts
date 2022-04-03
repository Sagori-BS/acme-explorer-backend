import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { InputType, Field } from '@nestjs/graphql';
import { GetCredentialByIdOrEmailInput } from './get-credential-by-id-or-email.input';
import { UpdateCredentialPayload } from './update-credential.payload';
import * as joi from 'joi';

@InputType()
export class UpdateCredentialInput extends ValidationInput {
  @Field()
  where: GetCredentialByIdOrEmailInput;

  @Field()
  data: UpdateCredentialPayload;

  public static validationSchema = joi.object<UpdateCredentialInput>({
    where: GetCredentialByIdOrEmailInput.validationSchema.required(),
    data: UpdateCredentialPayload.validationSchema.required()
  });
}
