import { CreateUserInput as CreateEntityInput } from '../create-user.input';
import * as faker from 'faker';
import { UserRoles } from '@shared/auth/enums/user-roles.enum';

describe('CreateUserInput', () => {
  const createEntityInput = {
    profilePicture: faker.internet.url(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    role: UserRoles.EXPLORER,
    email: faker.internet.email(),
    telephoneNumber: faker.phone.phoneNumberFormat().replace('-', ''),
    address: faker.address.streetAddress()
  };

  describe('Valid inputs', () => {
    it('should successfully validate the input', () => {
      // Arrange
      const input = {
        ...createEntityInput
      };

      // Act
      const { error, value } = CreateEntityInput.validationSchema.validate(
        input
      );

      // Assert
      expect(error).toBeUndefined();
      expect(value).toEqual(input);
    });
  });

  describe('Invalid inputs', () => {
    describe('profilePicture', () => {
      it('should return error when profilePicture is null', () => {
        const input = {
          ...createEntityInput,
          profilePicture: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`profilePicture`);
      });

      it('should return error when profilePicture is invalid', () => {
        const input = {
          ...createEntityInput,
          profilePicture: faker.lorem.word()
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`url`);
      });
    });

    describe('name', () => {
      it('should return error when name is undefined', () => {
        const input = {
          ...createEntityInput,
          name: undefined
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });

      it('should return error when name is null', () => {
        const input = {
          ...createEntityInput,
          name: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });

      it('should return error when name is invalid', () => {
        const input = {
          ...createEntityInput,
          name: ''
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });
    });

    describe('lastName', () => {
      it('should return error when lastName is undefined', () => {
        const input = {
          ...createEntityInput,
          lastName: undefined
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });

      it('should return error when lastName is null', () => {
        const input = {
          ...createEntityInput,
          lastName: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });

      it('should return error when lastName is invalid', () => {
        const input = {
          ...createEntityInput,
          lastName: ''
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });
    });

    describe('password', () => {
      it('should return error when password is undefined', () => {
        const input = {
          ...createEntityInput,
          password: undefined
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is null', () => {
        const input = {
          ...createEntityInput,
          password: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is invalid', () => {
        const input = {
          ...createEntityInput,
          password: faker.lorem.word(5)
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });
    });

    describe('email', () => {
      it('should return error when email is undefined', () => {
        const input = {
          ...createEntityInput,
          email: undefined
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });

      it('should return error when email is null', () => {
        const input = {
          ...createEntityInput,
          email: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });

      it('should return error when email is empty', () => {
        const input = {
          ...createEntityInput,
          email: ''
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });

      it('should return error when email is invalid', () => {
        const input = {
          ...createEntityInput,
          email: faker.lorem.word()
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`email`);
      });
    });

    describe('telephoneNumber', () => {
      it('should return error when telephoneNumber is null', () => {
        const input = {
          ...createEntityInput,
          telephoneNumber: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`telephoneNumber`);
      });

      it('should return error when telephoneNumber is invalid', () => {
        const input = {
          ...createEntityInput,
          telephoneNumber: faker.lorem.word(5)
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`telephoneNumber`);
      });
    });

    describe('address', () => {
      it('should return error when address is null', () => {
        const input = {
          ...createEntityInput,
          address: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`address`);
      });

      it('should return error when address is invalid', () => {
        const input = {
          ...createEntityInput,
          address: faker.lorem.word(4)
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`address`);
      });
    });

    describe('role', () => {
      it('should return error when roles is empty', () => {
        const input = {
          ...createEntityInput,
          role: ''
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
      });

      it('should return error when role is null', () => {
        const input = {
          ...createEntityInput,
          role: null
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
      });

      it('should return error when roles is invalid', () => {
        const input = {
          ...createEntityInput,
          role: faker.lorem.word()
        };

        const result = CreateEntityInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
      });
    });
  });
});
