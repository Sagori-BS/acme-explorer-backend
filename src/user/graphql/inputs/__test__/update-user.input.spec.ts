import { Types } from 'mongoose';
import { UpdateUserInput } from '../update-user.input';
import * as faker from 'faker';

const updateUserInput: UpdateUserInput = {
  where: {
    id: new Types.ObjectId().toHexString()
  },
  data: {
    profilePicture: faker.internet.url(),
    name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    telephoneNumber: faker.phone.phoneNumberFormat().replace('-', ''),
    address: faker.address.streetAddress()
  }
};

describe('UpdateUserInput', () => {
  it('should not return error when given a valid input', () => {
    const result = UpdateUserInput.validationSchema.validate(updateUserInput);

    expect(result.error).not.toBeDefined();
  });

  describe('Invalid inputs', () => {
    describe('name field errors', () => {
      it('should return error when name is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            name: null
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });

      it('should return error when name is invalid', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            name: ''
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });
    });

    describe('lastName field errors', () => {
      it('should return error when lastName is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            lastName: null
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });

      it('should return error when lastName is invalid', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            lastName: ''
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`lastName`);
      });
    });

    describe('password field errors', () => {
      it('should return error when password is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            password: null
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });

      it('should return error when password is invalid', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            password: faker.lorem.word(5)
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });
    });

    describe('telephoneNumber field errors', () => {
      it('should return error when telephoneNumber is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            telephoneNumber: null
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`telephoneNumber`);
      });

      it('should return error when telephoneNumber is invalid', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            telephoneNumber: faker.lorem.word(5)
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`telephoneNumber`);
      });
    });

    describe('address field errors', () => {
      it('should return error when address is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            address: null
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`address`);
      });

      it('should return error when address is invalid', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            address: 'hola'
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`address`);
      });
    });

    describe('profilePicture field errors', () => {
      it('should return error when profilePicture is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            profilePicture: null
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`profilePicture`);
      });

      it('should return error when profilePicture is invalid', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            profilePicture: 'not a url'
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`url`);
      });
    });
  });
});
