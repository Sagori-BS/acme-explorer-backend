import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import * as joi from 'joi';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { UpdateSponsorshipPayload } from './update-sponsorship.payload';

@InputType()
export class UpdateSponsorshipInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateSponsorshipPayload;

  public static validationSchema = joi.object<UpdateSponsorshipInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateSponsorshipPayload.validationSchema.required()
  });
}
