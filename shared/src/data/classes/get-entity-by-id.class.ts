import { Field, ID, InputType } from '@nestjs/graphql';
import { IGetEntityById } from '../interfaces/get-entity-by-id.interface';
import { ValidationInput } from './validation-input.class';
import * as joi from 'joi';
import { validateIdWithJoi } from '@shared/validations/common/mongo-id/id.validator';

@InputType()
export class GetEntityByIdInput extends ValidationInput
  implements IGetEntityById {
  @Field(_type => ID)
  id: string;

  deleted?: boolean;

  public static validationSchema = joi.object<GetEntityByIdInput>({
    id: validateIdWithJoi.required(),
  });
}
