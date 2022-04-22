import { Field, ID, InputType } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import * as joi from 'joi';

@InputType()
export class DeleteStageInput extends ValidationInput {
  @Field(() => ID)
  trip: string;

  @Field(() => ID)
  stage: string;

  public static validationSchema = joi.object<DeleteStageInput>({
    trip: validateMongoIdWithJoi('trip').required(),
    stage: validateMongoIdWithJoi('stage').required()
  });
}
