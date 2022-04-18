import { Field, InputType, Int } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { validateTitleWithJoi } from '@shared/validations/common/strings/title/title.validator';
import { validatePositiveNumberWithJoi } from '@shared/validations/data-types/number/number.validator';
import * as joi from 'joi';

@InputType()
export class CreateStageInput extends ValidationInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Int)
  price: number;

  public static validationSchema = joi.object<CreateStageInput>({
    title: validateTitleWithJoi.required(),
    description: validateDescriptionWithJoi.required(),
    price: validatePositiveNumberWithJoi.required()
  });
}
