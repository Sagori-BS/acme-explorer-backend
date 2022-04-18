import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { UpdateTripPayload } from './update-trip.payload';
import * as joi from 'joi';
import { ValidationInput } from '@shared/data/classes/validation-input.class';

@InputType()
export class UpdateTripInput extends ValidationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateTripPayload;

  public static validationSchema = joi.object<UpdateTripInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateTripPayload.validationSchema.required()
  });
}
