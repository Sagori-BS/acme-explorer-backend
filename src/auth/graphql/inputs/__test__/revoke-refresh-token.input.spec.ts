import { RevokeRefreshTokenInput } from '../revoke-refresh-token.input';
import { Types } from 'mongoose';

const revokeRefreshTokenInput = {
  user: new Types.ObjectId().toHexString()
};

describe('RevokeRefreshTokenInput', () => {
  it('should not return error when given input is valid', () => {
    const result = RevokeRefreshTokenInput.validationSchema.validate(
      revokeRefreshTokenInput
    );

    expect(result.error).not.toBeDefined();
  });

  describe('RevokeRefreshTokenInput invalid inputs', () => {
    describe('user field errors', () => {
      it('should return error when user is undefined', () => {
        const input = {
          ...revokeRefreshTokenInput,
          user: undefined
        };

        const result = RevokeRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`user`);
      });

      it('should return error when user is null`', () => {
        const input = {
          ...revokeRefreshTokenInput,
          user: null
        };

        const result = RevokeRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`user`);
      });

      it('should return error when user is invalid`', () => {
        const input = {
          ...revokeRefreshTokenInput,
          user: 'this is not an id'
        };

        const result = RevokeRefreshTokenInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`id`);
      });
    });
  });
});
