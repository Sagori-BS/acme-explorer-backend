import { CreateUserInput } from '../create-user.input';
import * as faker from 'faker';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';

const createUserInput = {
  profilePicture: faker.internet.url(),
  name: faker.name.firstName(),
  password: faker.internet.password(),
  role: UserRoles.CLIENT,
  email: faker.internet.email(),
};

describe('CreateUserInput', () => {
  it('should not return error when input is valid', () => {
    const result = CreateUserInput.validationSchema.validate(createUserInput);

    expect(result.error).not.toBeDefined();
  });

  describe('CreateUserInput invalid inputs', () => {
    describe('profilePicture field errors', () => {
      it('should return error when profilePicture is null', () => {
        const input = {
          ...createUserInput,
          profilePicture: null,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`profilePicture`);
      });

      it('should return error when profilePicture is invalid', () => {
        const input = {
          ...createUserInput,
          profilePicture: 'not a url',
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`url`);
      });
    });

    describe('name field errors', () => {
      it('should return error when name is undefined', () => {
        const input = {
          ...createUserInput,
          name: undefined,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });

      it('should return error when name is null', () => {
        const input = {
          ...createUserInput,
          name: null,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });

      it('should return error when name is invalid', () => {
        const input = {
          ...createUserInput,
          name: '',
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });
    });

    describe('password field errors', () => {
      it('should return error when password is undefined', () => {
        const input = {
          ...createUserInput,
          password: undefined,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is null', () => {
        const input = {
          ...createUserInput,
          password: null,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is invalid', () => {
        const input = {
          ...createUserInput,
          password: 'hello',
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });
    });

    describe('role field error', () => {
      it('should return error when role is undefined', () => {
        const input = {
          ...createUserInput,
          role: undefined,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
      });

      it('should return error when roles is empty', () => {
        const input = {
          ...createUserInput,
          role: '',
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
      });

      it('should return error when role is null', () => {
        const input = {
          ...createUserInput,
          role: null,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
      });

      it('should return error when roles is invalid', () => {
        const input = {
          ...createUserInput,
          role: faker.lorem.word(),
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
      });
    });

    describe('email field errors', () => {
      it('should return error when email is undefined', () => {
        const input = {
          ...createUserInput,
          email: undefined,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });

      it('should return error when email is null', () => {
        const input = {
          ...createUserInput,
          email: null,
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });

      it('should return error when email is empty', () => {
        const input = {
          ...createUserInput,
          email: '',
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });

      it('should return error when email is invalid', () => {
        const input = {
          ...createUserInput,
          email: '@gmail..com',
        };

        const result = CreateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });
    });
  });
});
