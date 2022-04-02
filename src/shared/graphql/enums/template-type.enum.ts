import { registerEnumType } from '@nestjs/graphql';

export enum TemplateType {
  CLIENT = 'client',
  SELL_YOUR_CAR = 'sell_your_car',
  OTHER = 'other'
}

registerEnumType(TemplateType, {
  name: 'TemplateType'
});
