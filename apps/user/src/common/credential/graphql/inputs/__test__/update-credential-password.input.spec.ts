import { UpdateCredentialPasswordInput } from '../update-credential-password.input';
import { Types } from 'mongoose';
import * as faker from 'faker';

const updateCredentialPasswordinput: UpdateCredentialPasswordInput = {
  where: {
    id: new Types.ObjectId().toHexString(),
    email: faker.internet.email(),
  },
  data: {
    password: faker.internet.password(),
  },
};

describe('UpdateCredentialPasswordInput', () => {
  it('should not return error when given input is valid', () => {
    const result = UpdateCredentialPasswordInput.validationSchema.validate(
      updateCredentialPasswordinput,
    );

    expect(result.error).not.toBeDefined();
  });

  describe('UpdateCredentialPasswordInput invalid inputs', () => {
    describe('where fields', () => {
      it('should return error when id is null', () => {
        const input = {
          where: {
            ...updateCredentialPasswordinput.where,
            id: null,
          },
          data: updateCredentialPasswordinput.data,
        };

        const result = UpdateCredentialPasswordInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`id`);
      });

      it('should return error when id is invalid', () => {
        const input = {
          where: {
            ...updateCredentialPasswordinput.where,
            id: 'not an id',
          },
          data: updateCredentialPasswordinput.data,
        };

        const result = UpdateCredentialPasswordInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`id`);
      });

      it('should return error when email is null', () => {
        const input = {
          where: {
            ...updateCredentialPasswordinput.where,
            email: null,
          },
          data: updateCredentialPasswordinput.data,
        };

        const result = UpdateCredentialPasswordInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });

      it('should return error when email is invalid', () => {
        const input = {
          where: {
            ...updateCredentialPasswordinput.where,
            email: 'missingdotcom@test',
          },
          data: updateCredentialPasswordinput.data,
        };

        const result = UpdateCredentialPasswordInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });
    });

    describe('password field errors', () => {
      it('should return error when password is undefined', () => {
        const input = {
          where: updateCredentialPasswordinput.where,
          data: {
            ...updateCredentialPasswordinput.data,
            password: undefined,
          },
        };

        const result = UpdateCredentialPasswordInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is null', () => {
        const input = {
          where: updateCredentialPasswordinput.where,
          data: {
            ...updateCredentialPasswordinput.data,
            password: null,
          },
        };

        const result = UpdateCredentialPasswordInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is invalid', () => {
        const input = {
          where: updateCredentialPasswordinput.where,
          data: {
            ...updateCredentialPasswordinput.data,
            password: '',
          },
        };

        const result = UpdateCredentialPasswordInput.validationSchema.validate(
          input,
        );

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });
    });
  });
});
