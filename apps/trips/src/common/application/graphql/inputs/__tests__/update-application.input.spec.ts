import { generateInvalidUpdateInputWithParams } from '@common/common/test/shared/update-input/generate-invalid-update-input-with-params';
import { generateValidUpdateInputWithParams } from '@common/common/test/shared/update-input/generate-valid-update-input-with-params';
import { generateValidInputTest } from '@common/common/test/shared/valid-input/generate-valid-input-test';
import { generateSuccessTestCases } from '@common/common/test/utils/generate-success-test-cases';
import * as faker from 'faker';
import { Types } from 'mongoose';
import { ApplicationState } from '../../enums/application-states.enum';
import { UpdateApplicationInput as UpdateEntityInput } from '../update-application.input';

describe('UpdateApplicationInput', () => {
  const updateEntityInput: UpdateEntityInput = {
    where: {
      id: new Types.ObjectId().toHexString()
    },
    data: {
      explorer: new Types.ObjectId().toHexString(),
      trip: new Types.ObjectId().toHexString(),
      reasonRejected: faker.lorem.word(5),
      comments: [faker.lorem.word()],
      state: faker.random.arrayElement(Object.values(ApplicationState))
    }
  };

  describe('Valid inputs', () => {
    it('should successfully validate the input', () => {
      generateValidInputTest(updateEntityInput, UpdateEntityInput);
    });

    it.each(generateSuccessTestCases(updateEntityInput))(
      'should successfully validate the input if the %s field is the only field provided in the update payload and has a valid value',
      (key, value) => {
        generateValidUpdateInputWithParams(
          updateEntityInput,
          UpdateEntityInput,
          key,
          value
        );
      }
    );
  });

  describe('Invalid inputs', () => {
    describe.each([
      ['trip', faker.lorem.word(3)],
      ['explorer', faker.lorem.word(3)],
      ['reasonRejected', faker.lorem.paragraphs(51)],
      ['comments', [faker.datatype.number()]],
      ['state', faker.lorem.word(5), 'state']
    ])('%s', (key, value, contain = key) => {
      it(`should return an error if given an invalid ${key} with value ${value}`, () => {
        generateInvalidUpdateInputWithParams(
          updateEntityInput,
          UpdateEntityInput,
          key,
          value,
          contain
        );
      });
    });
  });
});
