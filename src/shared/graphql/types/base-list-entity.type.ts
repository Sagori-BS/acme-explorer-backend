import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface IBaseListEntityType<T> {
  count: number;
  data: T[];
}

export function ListEntity<T>(classRef: Type<T>): Type<IBaseListEntityType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class BaseListEntityType implements IBaseListEntityType<T> {
    @Field()
    count: number;

    @Field(() => [classRef])
    data: T[];
  }
  return BaseListEntityType as Type<IBaseListEntityType<T>>;
}
