import { UpdateCredentialInput } from '../update-credential.input';
import { Types } from 'mongoose';
import * as faker from 'faker';

const updateCredentialInput: UpdateCredentialInput = {
  where: {
    id: new Types.ObjectId().toHexString(),
    email: faker.internet.email(),
  },
  data: {
    confirmed: faker.datatype.boolean(),
    blocked: faker.datatype.boolean(),
  },
};

describe('UpdateCredentialInput', () => {
  it('should not return error when given a valid input', () => {
    const result = UpdateCredentialInput.validationSchema.validate(
      updateCredentialInput,
    );

    expect(result.error).not.toBeDefined();
  });

  describe('where field errors', () => {
    it('should return error when id is null', () => {
      const input = {
        where: {
          ...updateCredentialInput.where,
          id: null,
        },
        data: updateCredentialInput.data,
      };

      const result = UpdateCredentialInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`id`);
    });

    it('should return error when id is invalid', () => {
      const input = {
        where: {
          ...updateCredentialInput.where,
          id: faker.lorem.word(), // not a valid id
        },
        data: updateCredentialInput.data,
      };

      const result = UpdateCredentialInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`id`);
    });
  });

  describe('confirmed field errors', () => {
    it('should return error when confirmed is null', () => {
      const input = {
        where: updateCredentialInput.where,
        data: { ...updateCredentialInput.data, confirmed: null },
      };

      const result = UpdateCredentialInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`confirmed`);
    });

    it('should return error when confirmed is invalid', () => {
      const input = {
        where: updateCredentialInput.where,
        data: {
          ...updateCredentialInput.data,
          confirmed: faker.datatype.string(), // not a boolean
        },
      };

      const result = UpdateCredentialInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`confirmed`);
    });
  });

  describe('blocked field errors', () => {
    it('should return error when blocked is null', () => {
      const input = {
        where: updateCredentialInput.where,
        data: { ...updateCredentialInput.data, blocked: null },
      };

      const result = UpdateCredentialInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`blocked`);
    });

    it('should return error when blocked is invalid', () => {
      const input = {
        where: updateCredentialInput.where,
        data: {
          ...updateCredentialInput.data,
          blocked: faker.datatype.string(), // not a boolean
        },
      };

      const result = UpdateCredentialInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`blocked`);
    });
  });
});
