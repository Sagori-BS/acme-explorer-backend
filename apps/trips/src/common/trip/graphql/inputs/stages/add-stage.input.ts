import { Field, ID, InputType } from '@nestjs/graphql';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { validateTitleWithJoi } from '@shared/validations/common/strings/title/title.validator';
import { validatePositiveNumberWithJoi } from '@shared/validations/data-types/number/number.validator';
import * as joi from 'joi';
import { CreateStageInput } from './create-stage.input';

@InputType()
export class AddStageInput extends CreateStageInput {
  @Field(() => ID)
  trip: string;

  public static validationSchema = joi.object<AddStageInput>({
    title: validateTitleWithJoi.required(),
    description: validateDescriptionWithJoi.required(),
    price: validatePositiveNumberWithJoi.required(),
    trip: validateMongoIdWithJoi('trip').required()
  });
}
