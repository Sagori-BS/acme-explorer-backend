import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import * as joi from 'joi';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { UpdateConfigurationPayload } from './update-configuration.payload';

@InputType()
export class UpdateConfigurationInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateConfigurationPayload;

  public static validationSchema = joi.object<UpdateConfigurationInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateConfigurationPayload.validationSchema.required()
  });
}
