import { CreateCredentialInput } from '../create-credential.input';
import * as faker from 'faker';

const createCredentialInput: CreateCredentialInput = {
  email: faker.internet.email(),
  password: faker.lorem.word(10),
};

describe('CreateCredentialInput', () => {
  it('should not return error when given a valid input', () => {
    const result = CreateCredentialInput.validationSchema.validate(
      createCredentialInput,
    );

    expect(result.error).not.toBeDefined();
  });

  describe('CreateCredentialInput invalid inputs', () => {
    describe('email field errors', () => {
      it('should return error when email is undefined', () => {
        const input = { ...createCredentialInput, email: undefined };

        const result = CreateCredentialInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });

      it('should return error when email is null', () => {
        const input = { ...createCredentialInput, email: null };

        const result = CreateCredentialInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });

      it('should return error when email is invalid', () => {
        const input = { ...createCredentialInput, email: faker.lorem.word() };

        const result = CreateCredentialInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });
    });

    describe('password field errors', () => {
      it('should return error when password is undefined', () => {
        const input = { ...createCredentialInput, password: undefined };

        const result = CreateCredentialInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is null', () => {
        const input = { ...createCredentialInput, password: null };

        const result = CreateCredentialInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it.each([[''], ['qwertyqwertyqwertyqwertyqwertyqwertyqwertyqwerty']])(
        'should return error when passwors is invalid',
        value => {
          const input = { ...createCredentialInput, password: value };

          const result = CreateCredentialInput.validationSchema.validate(input);

          expect(result.error).toBeDefined();
          expect(result.error.isJoi).toBeTruthy();
          expect(result.error.name).toBe('ValidationError');
          expect(result.error.message).toContain(`password`);
        },
      );
    });
  });
});
