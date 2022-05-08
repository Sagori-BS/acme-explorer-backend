import { ValidationError } from 'joi';
import { Types } from 'mongoose';
import * as faker from 'faker';
import { UpdateUserPreferencesPayload as UpdateEntityInput } from '../update-user-preferences.payload';

describe(UpdateEntityInput.name, () => {
  const updateEntityInput: UpdateEntityInput = {
    trips: [new Types.ObjectId().toHexString()]
  };

  describe('Invalid Inputs', () => {
    describe('trips', () => {
      it('should return an error if given an invalid trip ids', () => {
        // arrange
        const input: UpdateEntityInput = {
          ...updateEntityInput,
          trips: [faker.lorem.word()]
        };

        // act
        const { error } = UpdateEntityInput.validationSchema.validate(input);

        // assert
        expect(error.isJoi).toBeTruthy();
        expect(error).toBeInstanceOf(ValidationError);
      });
    });
  });
});
