import { Field, ID, InputType } from '@nestjs/graphql';
import { validateMongoIdWithJoi } from '@shared/validations/common/identification/mongo-id/id.validator';
import { validateUrlsWithJoi } from '@shared/validations/common/internet/urls/urls.validator';
import { validateIsoDateWithJoi } from '@shared/validations/common/iso-date/iso-date.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { validateTitleWithJoi } from '@shared/validations/common/strings/title/title.validator';
import * as joi from 'joi';
import { CreateTripInput } from './create-trip.input';

@InputType()
export class CreateInternalTripInput extends CreateTripInput {
  @Field(() => ID, { nullable: true })
  manager?: string;

  public static validationSchema = joi.object<CreateInternalTripInput>({
    startDate: validateIsoDateWithJoi.required(),
    endDate: validateIsoDateWithJoi.required(),
    pictures: validateUrlsWithJoi.required(),
    title: validateTitleWithJoi.required(),
    description: validateDescriptionWithJoi.required(),
    manager: validateMongoIdWithJoi('manager')
  });
}
