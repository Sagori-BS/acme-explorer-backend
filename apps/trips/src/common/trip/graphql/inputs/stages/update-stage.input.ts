import { InputType, PartialType } from '@nestjs/graphql';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { validateTitleWithJoi } from '@shared/validations/common/strings/title/title.validator';
import { validatePositiveNumberWithJoi } from '@shared/validations/data-types/number/number.validator';
import * as joi from 'joi';
import { CreateStageInput } from './create-stage.input';

@InputType()
export class UpdateStageInput extends PartialType(CreateStageInput) {
  public static validationSchema = joi.object<UpdateStageInput>({
    title: validateTitleWithJoi,
    description: validateDescriptionWithJoi,
    price: validatePositiveNumberWithJoi
  });
}
