import { CreateApplicationInput as CreateEntityInput } from '../create-application.input';
import { Types } from 'mongoose';
import { generateValidInputTest } from '@common/common/test/shared/valid-input/generate-valid-input-test';
import { generateInvalidCreateInputWithParams } from '@common/common/test/shared/create-input/generate-invalid-create-input-test-with-params';
import { ApplicationState } from '../../enums/application-states.enum';
import * as faker from 'faker';

describe('CreateApplication', () => {
  const createEntityInput: CreateEntityInput = {
    explorer: new Types.ObjectId().toHexString(),
    trip: new Types.ObjectId().toHexString(),
    reasonRejected: faker.lorem.word(5),
    comments: [faker.lorem.word()],
    state: faker.random.arrayElement(Object.values(ApplicationState))
  };

  describe('Valid inputs', () => {
    it('should successfully validate the input', () => {
      generateValidInputTest(createEntityInput, CreateEntityInput);
    });
  });

  describe('Invalid inputs', () => {
    describe.each([
      ['explorer', [null, undefined, faker.lorem.word(3)]],
      ['trip', [null, undefined, faker.lorem.word()]],
      ['reasonRejected', [null, undefined, faker.lorem.paragraphs(51)]],
      ['comments', [null, undefined, [faker.datatype.number()]]],
      ['state', [null, undefined, faker.lorem.word(5)], 'state']
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
