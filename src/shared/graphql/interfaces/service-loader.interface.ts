import { IBaseGraphqlFilterInput } from '@common/common/data/interfaces/base-graphql-filter-input.interface';
import { RequestLanguageOptionsDto } from '@common/common/language/dtos/request-language-options.dto';

export interface IServiceLoader {
  getEntities: (
    filterInput: IBaseGraphqlFilterInput,
    requestLanguageOptionsDto: RequestLanguageOptionsDto
  ) => Promise<any>;
}
