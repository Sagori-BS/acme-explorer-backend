import * as faker from 'faker';
import { UpdateUserPasswordInput } from '../update-user-password.input';

const upateUserPasswordInput: UpdateUserPasswordInput = {
  oldPassword: faker.internet.password(8),
  newPassword: faker.internet.password(9),
};

describe('UpdateUserPasswordInput', () => {
  it('should not return error when given a valid input', () => {
    const result = UpdateUserPasswordInput.validationSchema.validate(
      upateUserPasswordInput,
    );

    expect(result.error).not.toBeDefined();
  });

  describe('UpdateUserPasswordInput invalid inputs', () => {
    describe('oldPassword field errors', () => {
      it('should return error when oldPassword is undefined', () => {
        const input = { ...upateUserPasswordInput, oldPassword: undefined };

        const result = UpdateUserPasswordInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`oldPassword`);
      });

      it('should return error when oldPassword is null', () => {
        const input = { ...upateUserPasswordInput, oldPassword: null };

        const result = UpdateUserPasswordInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`oldPassword`);
      });

      it('should return error when oldPassword is invalid', () => {
        const input = { ...upateUserPasswordInput, oldPassword: 'a' };

        const result = UpdateUserPasswordInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`oldPassword`);
      });
    });

    describe('newPassword field errors', () => {
      it('should return error when newPassword is undefined', () => {
        const input = { ...upateUserPasswordInput, newPassword: undefined };

        const result = UpdateUserPasswordInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`newPassword`);
      });

      it('should return error when newPassword is null', () => {
        const input = { ...upateUserPasswordInput, newPassword: null };

        const result = UpdateUserPasswordInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`newPassword`);
      });

      it('should return error when newPassword is invalid', () => {
        const input = { ...upateUserPasswordInput, newPassword: 'pass' };

        const result = UpdateUserPasswordInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`newPassword`);
      });
    });
  });
});
