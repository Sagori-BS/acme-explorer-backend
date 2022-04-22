import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import * as joi from 'joi';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { UpdateCustomApplicationPayload } from './update-custom-application.payload';

@InputType()
export class UpdateCustomApplicationInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateCustomApplicationPayload;

  public static validationSchema = joi.object<UpdateCustomApplicationInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateCustomApplicationPayload.validationSchema.required()
  });
}
