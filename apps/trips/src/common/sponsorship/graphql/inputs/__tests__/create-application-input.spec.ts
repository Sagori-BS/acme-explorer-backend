import { CreateApplicationInput as CreateEntityInput } from '../create-application.input';
import { Types } from 'mongoose';
import { generateValidInputTest } from '@common/common/test/shared/valid-input/generate-valid-input-test';
import { generateInvalidCreateInputWithParams } from '@common/common/test/shared/create-input/generate-invalid-create-input-test-with-params';
import * as faker from 'faker';

describe('CreateApplication', () => {
  const createEntityInput: CreateEntityInput = {
    trip: new Types.ObjectId().toHexString(),
    comments: [faker.lorem.word()]
  };

  describe('Valid inputs', () => {
    it('should successfully validate the input', () => {
      generateValidInputTest(createEntityInput, CreateEntityInput);
    });
  });

  describe('Invalid inputs', () => {
    describe.each([
      ['trip', [null, undefined, faker.lorem.word()]],
      ['comments', [null, undefined, [faker.datatype.number()]], 'comments']
    ])('%s', (key, value, contain = key) => {
      it.each([...value])(`should return an error if the ${key} is %s`, () =>
        generateInvalidCreateInputWithParams(
          createEntityInput,
          CreateEntityInput,
          key,
          value,
          contain
        )
      );
    });
  });
});
