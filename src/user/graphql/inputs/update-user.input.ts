import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserPayload } from './update-user.payload';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';
import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import * as joi from 'joi';
import { ValidationInput } from '@common/common/data/classes/validation-input.class';

@InputType()
export class UpdateUserInput extends ValidationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateUserPayload;

  public static validationSchema = joi.object<UpdateUserInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateUserPayload.validationSchema.required()
  });
}
