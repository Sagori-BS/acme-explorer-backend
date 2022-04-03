import { GraphqlFilterOperation } from '../../enum/graphql-filter-operation.enum';

export enum MongoFilterOperationEnum {
  $eq = '$eq',
  $ne = '$ne',
  $in = '$in',
  $nin = '$nin',
  $regex = '$regex',
  $lte = '$lte',
  $lt = '$lt',
  $gte = '$gte',
  $gt = '$gt',
  $near = '$near',
  $text = '$text',
}

export type MongoOperation =
  | MongoFilterOperationEnum.$eq
  | MongoFilterOperationEnum.$ne
  | MongoFilterOperationEnum.$in
  | MongoFilterOperationEnum.$nin
  | MongoFilterOperationEnum.$regex
  | MongoFilterOperationEnum.$lte
  | MongoFilterOperationEnum.$lt
  | MongoFilterOperationEnum.$gte
  | MongoFilterOperationEnum.$gt
  | MongoFilterOperationEnum.$near
  | MongoFilterOperationEnum.$text;

export const graphqlOperationToMongoOperation: Record<
  GraphqlFilterOperation,
  MongoOperation
> = {
  eq: MongoFilterOperationEnum.$eq,
  ne: MongoFilterOperationEnum.$ne,
  in: MongoFilterOperationEnum.$in,
  nin: MongoFilterOperationEnum.$nin,
  contains: MongoFilterOperationEnum.$regex,
  ncontains: MongoFilterOperationEnum.$regex,
  lte: MongoFilterOperationEnum.$lte,
  lt: MongoFilterOperationEnum.$lt,
  gte: MongoFilterOperationEnum.$gte,
  gt: MongoFilterOperationEnum.$gt,
  near: MongoFilterOperationEnum.$near,
  search: MongoFilterOperationEnum.$text,
};
