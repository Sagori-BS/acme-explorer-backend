import { Types } from 'mongoose';
import { GetCredentialByIdOrEmailInput } from '../get-credential-by-id-or-email.input';
import * as faker from 'faker';

const getCredentialByIdOrEmailInput: GetCredentialByIdOrEmailInput = {
  id: new Types.ObjectId().toHexString(),
  email: faker.internet.email(),
};

describe('GetCredentialByIdOrEmailInput', () => {
  it('should not return error when input is valid', () => {
    const result = GetCredentialByIdOrEmailInput.validationSchema.validate(
      getCredentialByIdOrEmailInput,
    );

    expect(result.error).not.toBeDefined();
  });

  describe('GetCredentialByIdOrEmailInput invalid inputs', () => {
    it('should return error when no field is specified', () => {
      const input = {
        id: undefined,
        email: undefined,
      };

      const result = GetCredentialByIdOrEmailInput.validationSchema.validate(
        input,
      );

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`id`);
      expect(result.error.message).toContain(`email`);
    });

    describe('id field errors', () => {
      it('should return error when id is null', () => {
        const input = {
          ...getCredentialByIdOrEmailInput,
          id: null,
        };

        const result = GetCredentialByIdOrEmailInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`id`);
      });

      it('should return error when id is invalid', () => {
        const input = {
          ...getCredentialByIdOrEmailInput,
          id: faker.lorem.word(),
        };

        const result = GetCredentialByIdOrEmailInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`id`);
      });
    });
  });

  describe('email field errors', () => {
    it('should return error when email is null', () => {
      const input = {
        ...getCredentialByIdOrEmailInput,
        email: null,
      };

      const result = GetCredentialByIdOrEmailInput.validationSchema.validate(
        input,
      );

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`email`);
    });

    it('should return error when email is invalid', () => {
      const input = {
        ...getCredentialByIdOrEmailInput,
        email: 'missingdotcom@dot',
      };

      const result = GetCredentialByIdOrEmailInput.validationSchema.validate(
        input,
      );

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`email`);
    });
  });
});
