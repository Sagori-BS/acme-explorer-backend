import { Types } from 'mongoose';
import { UpdateUserInput } from '../update-user.input';
import * as faker from 'faker';

const updateUserInput: UpdateUserInput = {
  where: {
    id: new Types.ObjectId().toHexString(),
  },
  data: {
    profilePicture: faker.internet.url(),
    name: faker.name.firstName(),
  },
};

describe('UpdateUserInput', () => {
  it('should not return error when given a valid input', () => {
    const result = UpdateUserInput.validationSchema.validate(updateUserInput);

    expect(result.error).not.toBeDefined();
  });

  describe('UpdateUserInput invalid inputs', () => {
    it('should return error when missing where', () => {
      const input = { ...updateUserInput, where: null };

      const result = UpdateUserInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`where`);
    });

    it('should return error when missing id', () => {
      const input = { ...updateUserInput, where: { id: undefined } };

      const result = UpdateUserInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`id`);
    });

    it('should return error when id is invalid', () => {
      const input = { ...updateUserInput, where: { id: 'not an id' } };

      const result = UpdateUserInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`id`);
    });

    describe('name field errors', () => {
      it('should return error when name is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            name: null,
          },
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
            name: '',
          },
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`name`);
      });
    });

    describe('password field errors', () => {
      it('should return error when password is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            password: null,
          },
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
            password: '',
          },
        };

        const result = UpdateUserInput.validationSchema.validate(input);

        expect(result.error).toBeDefined();
        expect(result.error.isJoi).toBeTruthy();
        expect(result.error.name).toBe('ValidationError');
        expect(result.error.message).toContain(`password`);
      });
    });

    describe('profilePicture field errors', () => {
      it('should return error when profilePicture is null', () => {
        const input = {
          where: updateUserInput.where,
          data: {
            ...updateUserInput.data,
            profilePicture: null,
          },
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
            profilePicture: 'not a url',
          },
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
