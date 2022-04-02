import { registerEnumType } from '@nestjs/graphql';

export enum Currency {
  USD = 'usd',
  DOP = 'dop',
  MXN = 'mxn',
  COP = 'cop'
}

registerEnumType(Currency, {
  name: 'Currency'
});
