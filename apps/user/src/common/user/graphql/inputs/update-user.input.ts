import { InputType, Field } from '@nestjs/graphql';
import { UpdateUserPayload } from './update-user.payload';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import * as joi from 'joi';
import { validateIdWithJoi } from '@shared/validations/common/mongo-id/id.validator';
import { ValidationInput } from '@shared/data/classes/validation-input.class';

@InputType()
export class UpdateUserInput extends ValidationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateUserPayload;

  public static validationSchema = joi.object<UpdateUserInput>({
    where: {
      id: validateIdWithJoi.required(),
    },
    data: UpdateUserPayload.validationSchema,
  });
}
