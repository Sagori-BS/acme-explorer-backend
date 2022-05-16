import { IUpdateEntity } from '@shared/data/interfaces/update-entity.interface';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@shared/data/classes/get-entity-by-id.class';
import * as joi from 'joi';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { UpdateFavoriteListPayload } from './update-favorite-list.payload';

@InputType()
export class UpdateFavoriteListInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateFavoriteListPayload;

  public static validationSchema = joi.object<UpdateFavoriteListInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateFavoriteListPayload.validationSchema.required()
  });
}
