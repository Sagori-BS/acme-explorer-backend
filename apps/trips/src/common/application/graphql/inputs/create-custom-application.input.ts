import { InputType, Field, ID } from '@nestjs/graphql';
import { ApplicationState } from '../enums/application-states.enum';
import * as joi from 'joi';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { CreateApplicationInput } from './create-application.input';

@InputType()
export class CreateCustomApplicationInput extends CreateApplicationInput {
  @Field(() => ID, { nullable: true })
  explorer?: string;

  @Field(() => ApplicationState, { nullable: true })
  state?: ApplicationState;

  @Field({ nullable: true })
  reasonRejected?: string;

  manager?: string;

  public static validationSchema = joi.object<CreateCustomApplicationInput>({
    trip: validateMongoIdWithJoi('trip').required(),
    explorer: validateMongoIdWithJoi('explorer'),
    comments: joi.array().items(joi.string()),
    state: joi.string().valid(...Object.values(ApplicationState)),
    reasonRejected: validateDescriptionWithJoi
  });
}
