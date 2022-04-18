import { Field, InputType } from '@nestjs/graphql';
import { ValidationInput } from '@shared/data/classes/validation-input.class';
import { validateUrlsWithJoi } from '@shared/validations/common/internet/urls/urls.validator';
import { validateIsoDateWithJoi } from '@shared/validations/common/iso-date/iso-date.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { validateTitleWithJoi } from '@shared/validations/common/strings/title/title.validator';
import * as joi from 'joi';
import { CreateStageInput } from '../stages/create-stage.input';

@InputType()
export class CreateTripInput extends ValidationInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String])
  requirements: string[];

  @Field(() => [String])
  pictures: string[];

  @Field(() => [CreateStageInput])
  stages: CreateStageInput[];

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  manager?: string;

  public static validationSchema = joi.object<CreateTripInput>({
    startDate: validateIsoDateWithJoi.required(),
    endDate: validateIsoDateWithJoi.required(),
    pictures: validateUrlsWithJoi.required(),
    title: validateTitleWithJoi.required(),
    description: validateDescriptionWithJoi.required()
  });
}
