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
    describe('name', () => {
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

    describe('telephoneNumber', () => {
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

    describe('address', () => {
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
            address: faker.lorem.word(4)
          }
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`address`);
      });
    });

    describe('profilePicture', () => {
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
            profilePicture: faker.lorem.word()
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
