import { LanguageCodeEnum } from '@common/common/language/enum/language-code.enum';
import { IServiceLoader } from '../interfaces/service-loader.interface';

export type BaseDataLoaderBuilderOptions = {
  service: IServiceLoader;
  fieldName: string;
  metaData: {
    language: LanguageCodeEnum;
  };
};
