import { IBaseGraphqlFilterInput } from '@shared/data/interfaces/base-graphql-filter-input.interface';
import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { GraphqlSortOperation } from '../advanced-filter/enum/graphql-sort-operation.enum';

@InputType()
export class FilterInput implements IBaseGraphqlFilterInput {
  @Field(_type => Int, { nullable: true })
  start?: number;

  @Field(_type => Int, { nullable: true })
  limit?: number;

  @Field(_type => GraphQLJSON, { nullable: true })
  sort?: Record<string, GraphqlSortOperation>;

  @Field(_type => GraphQLJSON, { nullable: true })
  where?: Record<string, any>;
}
