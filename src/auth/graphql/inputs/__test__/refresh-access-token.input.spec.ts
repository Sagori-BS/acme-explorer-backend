import { RefreshAccessTokenInput } from '../refresh-access-token.input';
import * as jsonwebtoken from 'jsonwebtoken';

const generateDummyToken = (): string => {
  return jsonwebtoken.sign({ foo: 'bar' }, 'foo');
};

const refreshAccessTokenInput: RefreshAccessTokenInput = {
  refreshToken: generateDummyToken()
};

describe('RefreshAccessTokenInput', () => {
  it('should not return error when given input is valid', () => {
    const result = RefreshAccessTokenInput.validationSchema.validate(
      refreshAccessTokenInput
    );

    expect(result.error).not.toBeDefined();
  });

  describe('RefreshAccessTokenInput invalid inputs', () => {
    it('should return error when refreshToken is undefined', () => {
      const input = {
        ...refreshAccessTokenInput,
        refreshToken: undefined
      };

      const result = RefreshAccessTokenInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`refreshToken`);
    });

    it('should return error when refreshToken is null', () => {
      const input = {
        ...refreshAccessTokenInput,
        refreshToken: null
      };

      const result = RefreshAccessTokenInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`refreshToken`);
    });

    it('should return error when refreshToken is invalid', () => {
      const input = {
        ...refreshAccessTokenInput,
        refreshToken: 'this is not a valid token'
      };

      const result = RefreshAccessTokenInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`token`);
    });
  });
});
