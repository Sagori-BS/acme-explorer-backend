import { Field, ID, InputType } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import * as joi from 'joi';

@InputType()
export class RejectApplicationInput extends ValidationInput {
  @Field(() => ID)
  id: string;

  @Field()
  reasonRejected: string;

  public static validationSchema = joi.object<RejectApplicationInput>({
    id: validateMongoIdWithJoi('id').required(),
    reasonRejected: joi.string().required()
  });
}
