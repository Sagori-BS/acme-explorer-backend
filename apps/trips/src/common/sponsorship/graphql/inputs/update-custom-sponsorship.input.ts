import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import * as joi from 'joi';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { UpdateCustomSponsorshipPayload } from './update-custom-sponsorship.payload';

@InputType()
export class UpdateCustomSponsorshipInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateCustomSponsorshipPayload;

  public static validationSchema = joi.object<UpdateCustomSponsorshipInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateCustomSponsorshipPayload.validationSchema.required()
  });
}
