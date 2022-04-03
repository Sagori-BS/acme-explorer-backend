import { registerEnumType } from '@nestjs/graphql';

export enum GraphqlFilterOperationEnum {
  eq = 'eq',
  ne = 'ne',
  in = 'in',
  nin = 'nin',
  contains = 'contains',
  ncontains = 'ncontains',
  lte = 'lte',
  lt = 'lt',
  gte = 'gte',
  gt = 'gt',
  near = 'near',
  search = 'search',
}

export type GraphqlFilterOperation =
  | GraphqlFilterOperationEnum.eq
  | GraphqlFilterOperationEnum.ne
  | GraphqlFilterOperationEnum.in
  | GraphqlFilterOperationEnum.nin
  | GraphqlFilterOperationEnum.contains
  | GraphqlFilterOperationEnum.ncontains
  | GraphqlFilterOperationEnum.lte
  | GraphqlFilterOperationEnum.lt
  | GraphqlFilterOperationEnum.gte
  | GraphqlFilterOperationEnum.gt
  | GraphqlFilterOperationEnum.near
  | GraphqlFilterOperationEnum.search;

registerEnumType(GraphqlFilterOperationEnum, {
  name: 'GraphqlFilterOperation',
});
