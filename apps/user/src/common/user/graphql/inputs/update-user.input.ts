import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserPayload } from './update-user.payload';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import * as joi from 'joi';

@InputType()
export class UpdateUserInput extends ValidationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateUserPayload;

  public static validationSchema = joi.object<UpdateUserInput>({
    where: GetEntityByIdInput.validationSchema,
    data: UpdateUserPayload.validationSchema
  });
}
