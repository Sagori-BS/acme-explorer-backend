import { Field, Float, InputType } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validatePositiveNumberWithJoi } from '@shared/validations/data-types/number/number.validator';
import * as joi from 'joi';

@InputType()
export class CreateConfigurationInput extends ValidationInput {
  @Field(() => Float)
  flatRate: number;

  public static validationSchema = joi.object<CreateConfigurationInput>({
    flatRate: validatePositiveNumberWithJoi.required()
  });
}
