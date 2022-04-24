import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { UpdateApplicationPayload } from './update-application.payload';
import * as joi from 'joi';
import { ValidationInput } from '@shared/data/classes/validation-input.class';

@InputType()
export class UpdateApplicationInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateApplicationPayload;

  public static validationSchema = joi.object<UpdateApplicationInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateApplicationPayload.validationSchema.required()
  });
}
