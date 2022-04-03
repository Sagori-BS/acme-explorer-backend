import {
  GraphqlFilterOperation,
  GraphqlFilterOperationEnum,
} from '../../../enum/graphql-filter-operation.enum';

export const formatMongoRegexOperation = (
  text: string,
  graphqlOperation: GraphqlFilterOperation,
) => {
  const regexOptions = { $options: 'i' };

  if (graphqlOperation === GraphqlFilterOperationEnum.contains) {
    return {
      $regex: regexContainsOperationFormatter(text),
      ...regexOptions,
    };
  }

  return {
    $regex: regexNotContainsOperationFormatter(text),
    ...regexOptions,
  };
};

/* A utility function that takes as parameter a string and converts it
  to a regular expression that emulates text search 
  Example:
  input -> toyota
  output -> .*t.*?o.*?y.*?o.*?t.*?a.*?.*
  more about regular expressions here: https://github.com/ziishaned/learn-regex
*/

function regexContainsOperationFormatter(text: string): string {
  let expression = '.*';

  for (const c of text) {
    expression += `${c}.*?`;
  }

  expression += '.*';

  return expression;
}

function regexNotContainsOperationFormatter(text: string): string {
  return `^((?!.*${text}.*).)*$`;
}
