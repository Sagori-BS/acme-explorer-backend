import { registerEnumType } from '@nestjs/graphql';

export enum ChangeTypeEnum {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral'
}

registerEnumType(ChangeTypeEnum, {
  name: 'ChangesTypeEnum'
});
