import { InputType, PartialType } from '@nestjs/graphql';
import * as joi from 'joi';
import { CreateCustomApplicationInput } from './create-custom-application.input';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { ApplicationState } from '../enums/application-states.enum';

@InputType()
export class UpdateCustomApplicationPayload extends PartialType(
  CreateCustomApplicationInput
) {
  public static validationSchema = joi.object<UpdateCustomApplicationPayload>({
    trip: validateMongoIdWithJoi('trip'),
    explorer: validateMongoIdWithJoi('explorer'),
    comments: joi.array().items(joi.string()),
    state: joi.string().valid(...Object.values(ApplicationState)),
    reasonRejected: validateDescriptionWithJoi
  });
}
