import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import { UpdateRefreshTokenPayload } from './update-refresh-token.payload';
import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';
import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import * as joi from 'joi';

@InputType()
export class UpdateRefreshTokenInput extends ValidationInput
  implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateRefreshTokenPayload;

  public static validationSchema = joi.object<UpdateRefreshTokenInput>({
    where: GetEntityByIdInput.validationSchema.required(),
    data: UpdateRefreshTokenPayload.validationSchema.required()
  });
}
