export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  INVALID_OPERATION = 'INVALID_OPERATION',
  BLOCKED_USER = 'BLOCKED_USER',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EXPIRED_TOKEN = 'EXPIRED_TOKEN',
  MALFORMED_TOKEN = 'MALFORMED_TOKEN',
  INVALID_USER_INPUT = 'INVALID_USER_INPUT',
  INVALID_GQL_FILTER_OPERATION = 'INVALID_GQL_FILTER_OPERATION',
  INVALID_GQL_SORT_OPERATION = 'INVALID_GQL_SORT_OPERATION',
  INVALID_LIMIT_VALUE = 'INVALID_LIMIT_VALUE',
  INVALID_START_VALUE = 'INVALID_START_VALUE',
  UNAUTHORIZED_ROLE = 'UNAUTHORIZED_ROLE',
  DUPLICATE_KEY = 'DUPLICATE_KEY',
  DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
}