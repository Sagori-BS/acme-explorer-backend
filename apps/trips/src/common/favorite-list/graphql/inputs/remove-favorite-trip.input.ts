import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { Field, ID, InputType } from '@nestjs/graphql';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import * as joi from 'joi';

@InputType()
export class RemoveFavoriteTripInput extends ValidationInput {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  trip: string;

  public static validationSchema = joi.object<RemoveFavoriteTripInput>({
    id: validateMongoIdWithJoi('id').required(),
    trip: validateMongoIdWithJoi('trip').required()
  });
}
