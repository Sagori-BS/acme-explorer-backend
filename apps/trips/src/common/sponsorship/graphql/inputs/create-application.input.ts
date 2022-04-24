import { InputType, Field, ID } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import * as joi from 'joi';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';

@InputType()
export class CreateApplicationInput extends ValidationInput {
  @Field(() => ID)
  trip: string;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  public static validationSchema = joi.object<CreateApplicationInput>({
    trip: validateMongoIdWithJoi('trip').required(),
    comments: joi.array().items(joi.string())
  });
}
