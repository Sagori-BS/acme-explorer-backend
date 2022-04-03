import { SignUpUserInput } from '../sign-up-user.input';
import * as faker from 'faker';

const signUpUserInput: SignUpUserInput = {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  profilePicture: faker.internet.url(),
  telephoneNumber: faker.phone.phoneNumberFormat().replace('-', ''),
  address: faker.address.streetAddress(),
  documentId: faker.datatype
    .number({ min: 10000000000, max: 99999999999 })
    .toString(),
  drivingLicense: faker.datatype
    .number({ min: 10000000000, max: 99999999999 })
    .toString()
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
          name: undefined
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
          name: null
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
          name: faker.datatype.string(300)
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });
    });

    describe('lastName field errors', () => {
      it('should return error when lastName is undefined', () => {
        const input = {
          ...signUpUserInput,
          lastName: undefined
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });

      it('should return error when lastName is null', () => {
        const input = {
          ...signUpUserInput,
          lastName: null
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });

      it('should return error when lastName is invalid', () => {
        const input = {
          ...signUpUserInput,
          lastName: faker.datatype.string(300)
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });
    });

    describe('email field errors', () => {
      it('should return error when email is undefined', () => {
        const input = {
          ...signUpUserInput,
          email: undefined
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
          email: null
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
          email: 'missingdotcom@curbo'
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
          password: undefined
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
          password: null
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
          password: faker.datatype.string(300)
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
          profilePicture: null
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
          profilePicture: faker.lorem.word() // not a url
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`url`);
      });
    });

    describe('telephoneNumber field errors', () => {
      it('should return error when telephoneNumber is null', () => {
        const input = {
          ...signUpUserInput,
          telephoneNumber: null
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`telephoneNumber`);
      });

      it('should return error when telephoneNumber is invalid', () => {
        const input = {
          ...signUpUserInput,
          telephoneNumber: faker.datatype.boolean() // not a string
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`telephoneNumber`);
      });
    });

    describe('address field errors', () => {
      it('should return error when address is null', () => {
        const input = {
          ...signUpUserInput,
          address: null
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`address`);
      });

      it('should return error when address is invalid', () => {
        const input = {
          ...signUpUserInput,
          address: faker.datatype.boolean() // not a string
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`address`);
      });
    });

    describe('documentId field errors', () => {
      it('should return error when documentId is null', () => {
        const input = {
          ...signUpUserInput,
          documentId: null
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`documentId`);
      });

      it('should return error when documentId is invalid', () => {
        const input = {
          ...signUpUserInput,
          documentId: faker.datatype.number({ min: 1000000000 })
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`documentId`);
      });
    });

    describe('drivingLicense field errors', () => {
      it('should return error when drivingLicense is null', () => {
        const input = {
          ...signUpUserInput,
          drivingLicense: null
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`drivingLicense`);
      });

      it('should return error when drivingLicense is invalid', () => {
        const input = {
          ...signUpUserInput,
          drivingLicense: faker.datatype.string(300)
        };

        const result = SignUpUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message.toLowerCase()).toContain(`driving`);
        expect(result.error.message.toLowerCase()).toContain(`license`);
      });
    });
  });
});
