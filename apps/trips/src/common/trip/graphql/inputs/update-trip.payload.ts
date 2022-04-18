import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateTripInput } from './trips/create-trip.input';
import * as joi from 'joi';
import { validateUrlsWithJoi } from '@shared/validations/common/internet/urls/urls.validator';
import { validateIsoDateWithJoi } from '@shared/validations/common/iso-date/iso-date.validator';
import { validateDescriptionWithJoi } from '@shared/validations/common/strings/description/description.validator';
import { validateTitleWithJoi } from '@shared/validations/common/strings/title/title.validator';

@InputType()
export class UpdateTripPayload extends PartialType(
  OmitType(CreateTripInput, ['manager'])
) {
  public static validationSchema = joi.object<CreateTripInput>({
    startDate: validateIsoDateWithJoi,
    endDate: validateIsoDateWithJoi,
    pictures: validateUrlsWithJoi,
    title: validateTitleWithJoi,
    description: validateDescriptionWithJoi
  });
}
