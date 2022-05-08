import { IGraphQLRequestContext } from '@common/common/graphql/interfaces/graphql-request-context.interface';
import { IGraphQLRequestContextLoaders } from './loaders.interface';

export type GraphQLRequestContext = IGraphQLRequestContext<
  IGraphQLRequestContextLoaders
>;
