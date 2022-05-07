import { IBaseGraphqlFilterInput } from '@common/common/data/interfaces/base-graphql-filter-input.interface';

export interface IServiceLoader {
  getEntities: (filterInput: IBaseGraphqlFilterInput) => Promise<any>;
}
