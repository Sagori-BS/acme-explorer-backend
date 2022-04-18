import { InputType, Field, ID } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { ApplicationState } from '../enums/application-states.enum';
import * as joi from 'joi';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';

@InputType()
export class CreateApplicationInput extends ValidationInput {
  @Field(() => ID)
  explorer: string;

  @Field(() => ID)
  trip: string;

  @Field({ nullable: true })
  reasonRejected?: string;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  @Field(() => ApplicationState, { nullable: true })
  state?: ApplicationState;

  public static validationSchema = joi.object<CreateApplicationInput>({
    trip: validateMongoIdWithJoi('trip').required(),
    explorer: validateMongoIdWithJoi('explorer').required(),
    comments: joi.array().items(joi.string()),
    state: joi.string().valid(Object.values(ApplicationState)),
    reasonRejected: validateDescriptionWithJoi
  });
}
