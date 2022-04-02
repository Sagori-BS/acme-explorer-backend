import { ValidationInput } from '@common/common/data/classes/validation-input.class';
import { IFilterByIsoDateDto } from '@common/common/data/interfaces/get-entities-by-date-range.interface';
import { validateIsoDateWithJoi } from '@common/common/validations/common/iso/iso-date/iso-date.validator';
import { Field, InputType } from '@nestjs/graphql';
import * as joi from 'joi';

@InputType()
export class FilterByIsoDateRangeInput extends ValidationInput
  implements IFilterByIsoDateDto {
  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;

  static validationSchema = joi.object<FilterByIsoDateRangeInput>({
    from: validateIsoDateWithJoi,
    to: validateIsoDateWithJoi
  });
}
