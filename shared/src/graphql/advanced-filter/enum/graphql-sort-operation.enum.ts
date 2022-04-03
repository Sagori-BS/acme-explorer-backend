import { registerEnumType } from '@nestjs/graphql';

export enum GraphqlSortOperationEnum {
  asc = 'asc',
  desc = 'desc',
}

export type GraphqlSortOperation =
  | GraphqlSortOperationEnum.asc
  | GraphqlSortOperationEnum.desc;

registerEnumType(GraphqlSortOperationEnum, {
  name: 'GraphQLSortOperation',
});
