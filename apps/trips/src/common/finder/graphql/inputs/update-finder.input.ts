import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import * as joi from 'joi';
import { UpdateFinderPayload } from './update-finder.payload';

@InputType()
export class UpdateFinderInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateFinderPayload;

  public static validationSchema = joi.object<UpdateFinderInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateFinderPayload.validationSchema.required()
  });
}
