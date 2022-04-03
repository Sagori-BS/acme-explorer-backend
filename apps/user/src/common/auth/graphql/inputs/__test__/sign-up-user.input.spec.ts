import { SignUpUserInput } from '../sign-up-user.input';
import * as faker from 'faker';

const signUpUserInput: SignUpUserInput = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  profilePicture: faker.internet.url(),
};

describe('SignUpUserInput', () => {
  it('should not return error when given input is valid', () => {
    const result = SignUpUserInput.validationSchema.validate(signUpUserInput);

    expect(result.error).not.toBeDefined();
  });

  describe('SignUpUserInput invalid inputs', () => {
    describe('name field errors', () => {
      it('should return error when name is undefined', () => {
        const input = {
          ...signUpUserInput,
          name: undefined,
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });

      it('should return error when name is null', () => {
        const input = {
          ...signUpUserInput,
          name: null,
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });

      it('should return error when name is invalid', () => {
        const input = {
          ...signUpUserInput,
          name: faker.datatype.string(300),
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });
    });

    describe('email field errors', () => {
      it('should return error when email is undefined', () => {
        const input = {
          ...signUpUserInput,
          email: undefined,
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });

      it('should return error when email is null', () => {
        const input = {
          ...signUpUserInput,
          email: null,
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });

      it('should return error when email is invalid', () => {
        const input = {
          ...signUpUserInput,
          email: 'missingdotcom@test',
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`email`);
      });
    });

    describe('password field errors', () => {
      it('should return error when password is undefined', () => {
        const input = {
          ...signUpUserInput,
          password: undefined,
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is null', () => {
        const input = {
          ...signUpUserInput,
          password: null,
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is invalid', () => {
        const input = {
          ...signUpUserInput,
          password: faker.datatype.string(300),
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });
    });

    describe('profilePicture field errors', () => {
      it('should return error when profilePicture is null', () => {
        const input = {
          ...signUpUserInput,
          profilePicture: null,
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`profilePicture`);
      });

      it('should return error when profilePicture is invalid', () => {
        const input = {
          ...signUpUserInput,
          profilePicture: faker.lorem.word(), // not a url
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`url`);
      });
    });
  });
});
