import { SocialSignInInput } from '../social-sign-in.input';
import * as faker from 'faker';

const socialSignInInput = {
  token: faker.lorem.words(),
};

describe('SocialSignInInput', () => {
  it('should not return error when input is valid', () => {
    const result = SocialSignInInput.validationSchema.validate(
      socialSignInInput,
    );

    expect(result.error).not.toBeDefined();
  });

  describe('SocialSignInInput invalid inputs', () => {
    describe('token field errors', () => {
      it('should return error when token is undefined', () => {
        const input = {
          ...socialSignInInput,
          token: undefined,
        };

        const result = SocialSignInInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`token`);
      });

      it('should return error when token is null', () => {
        const input = {
          ...socialSignInInput,
          token: null,
        };

        const result = SocialSignInInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`token`);
      });

      it('should return error when token is invalid', () => {
        const input = {
          ...socialSignInInput,
          token: 10,
        };

        const result = SocialSignInInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`token`);
      });
    });
  });
});
