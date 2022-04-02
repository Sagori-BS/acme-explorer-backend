import { registerEnumType } from '@nestjs/graphql';

export enum TimeUnitEnum {
  DAYS = 'DAYS',
  WEEKS = 'WEEKS',
  MONTHS = 'MONTHS',
  YEARS = 'YEARS'
}

registerEnumType(TimeUnitEnum, {
  name: 'TimeUnit'
});
