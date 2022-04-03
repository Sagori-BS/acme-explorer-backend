import { GraphqlSortOperation } from '../../enum/graphql-sort-operation.enum';

export enum MongoSortOperationEnum {
  asc = 1,
  desc = -1,
}

export type MongoSortOperation =
  | MongoSortOperationEnum.asc
  | MongoSortOperationEnum.desc;

export const graphqlSortOperationToMongoSortOperation: Record<
  GraphqlSortOperation,
  MongoSortOperation
> = {
  asc: MongoSortOperationEnum.asc,
  desc: MongoSortOperationEnum.desc,
};
