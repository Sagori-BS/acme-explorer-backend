import { BlockUserInput } from '../block-user.input';
import * as faker from 'faker';

const blockUserInput: BlockUserInput = {
  email: faker.internet.email(),
};

describe('BlockUserInput', () => {
  it('should not return error when given input is valid', () => {
    const result = BlockUserInput.validationSchema.validate(blockUserInput);

    expect(result.error).not.toBeDefined();
  });

  describe('BlockUserInput invalid inputs', () => {
    it('should return error when email is undefined', () => {
      const input = {
        ...blockUserInput,
        email: undefined,
      };

      const result = BlockUserInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`email`);
    });

    it('should return error when email is null', () => {
      const input = {
        ...blockUserInput,
        email: null,
      };

      const result = BlockUserInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`email`);
    });

    it('should return error when email is invalid', () => {
      const input = {
        ...blockUserInput,
        email: 'missingdotcom@test',
      };

      const result = BlockUserInput.validationSchema.validate(input);

      expect(result.error).toBeDefined();
      expect(result.error.isJoi).toBeTruthy();
      expect(result.error.name).toBe('ValidationError');
      expect(result.error.message).toContain(`email`);
    });
  });
});
