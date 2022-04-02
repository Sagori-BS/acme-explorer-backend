import { validateIdWithJoi } from '@common/common/validations/common/identification/mongo-id/id.validator';
import { Field, ID, InputType } from '@nestjs/graphql';
import * as joi from 'joi';
import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { validateBooleanWithJoi } from '@common/common/validations/data-types/boolean/boolean.validator';
import { validateEmailWithJoi } from '@common/common/validations/entities/user/email/email.validator';
import { IGetEntityById } from '../interfaces/get-entity-by-id.interface';

@InputType()
export class GetSelfEntityByIdInput
  extends ValidationInput
  implements IGetEntityById
{
  @Field(() => ID)
  id: string;

  user?: string;

  email?: string;

  deleted?: boolean;

  public static validationSchema = joi.object<GetSelfEntityByIdInput>({
    id: validateIdWithJoi.required(),
    user: validateIdWithJoi,
    deleted: validateBooleanWithJoi,
    email: validateEmailWithJoi
  });
}
