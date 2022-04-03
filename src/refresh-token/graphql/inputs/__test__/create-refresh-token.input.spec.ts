import { CreateRefreshTokenInput } from '../create-refresh-token.input';
import { Types } from 'mongoose';
import * as faker from 'faker';

const createRefreshTokenInput: CreateRefreshTokenInput = {
  user: new Types.ObjectId().toHexString(),
  expiresIn: faker.date.future().toISOString()
};

describe('CreateRefreshTokenInput', () => {
  it('should not return error when input is valid', () => {
    const result = CreateRefreshTokenInput.validationSchema.validate(
      createRefreshTokenInput
    );

    expect(result.error).not.toBeDefined();
  });

  describe('CreateRefreshTokenInput invalid inputs', () => {
    describe('user field errors', () => {
      it('should return error when user is undefined', () => {
        const input = {
          ...createRefreshTokenInput,
          user: undefined
        };

        const result = CreateRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`user`);
      });

      it('should return error when user is null', () => {
        const input = {
          ...createRefreshTokenInput,
          user: null
        };

        const result = CreateRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`user`);
      });

      it('should return error when user is invalid', () => {
        const input = {
          ...createRefreshTokenInput,
          user: null
        };

        const result = CreateRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`user`);
      });
    });

    describe('expiresIn field errors', () => {
      it('should return error when expiresIn is null', () => {
        const input = {
          ...createRefreshTokenInput,
          expiresIn: null
        };

        const result = CreateRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`expiresIn`);
      });

      it('should return error when expiresIn is invalid', () => {
        const input = {
          ...createRefreshTokenInput,
          expiresIn: '10-20'
        };

        const result = CreateRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`isodate`);
      });
    });
  });
});
