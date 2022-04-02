import { Field, ID, InputType } from '@nestjs/graphql';
import { IGetEntityById } from '../interfaces/get-entity-by-id.interface';
import { ValidationInput } from './validation-input.class';
import * as joi from 'joi';
import { validateIdWithJoi } from '@common/common/validations/common/identification/mongo-id/id.validator';

@InputType()
export class GetEntityByIdInput
  extends ValidationInput
  implements IGetEntityById
{
  @Field(() => ID)
  id: string;

  deleted?: boolean;

  public static validationSchema = joi.object<GetEntityByIdInput>({
    id: validateIdWithJoi.required()
  });
}
