import { InputType, PartialType } from '@nestjs/graphql';
import { ApplicationState } from '../enums/application-states.enum';
import { CreateApplicationInput } from './create-application.input';
import * as joi from 'joi';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';

@InputType()
export class UpdateApplicationPayload extends PartialType(
  CreateApplicationInput
) {
  public static validationSchema = joi.object<CreateApplicationInput>({
    trip: validateMongoIdWithJoi('trip'),
    explorer: validateMongoIdWithJoi('explorer'),
    comments: joi.array().items(joi.string()),
    state: joi.string().valid(Object.values(ApplicationState)),
    reasonRejected: validateDescriptionWithJoi
  });
}
