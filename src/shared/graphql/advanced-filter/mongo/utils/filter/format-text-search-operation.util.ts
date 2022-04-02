import { InvalidSearchValueError } from '@common/common/errors/filters/invalid-search-value.error';

export const formatTextSearchOperation = (value: string) => {
  if (!value) {
    return {
      $search: ''
    };
  }

  if (typeof value !== 'string') {
    throw new InvalidSearchValueError(value);
  }

  return {
    $search: value
  };
};
