import { generateInvalidUpdateInputWithParams } from '@common/common/test/shared/update-input/generate-invalid-update-input-with-params';
import { generateValidUpdateInputWithParams } from '@common/common/test/shared/update-input/generate-valid-update-input-with-params';
import { generateValidInputTest } from '@common/common/test/shared/valid-input/generate-valid-input-test';
import { generateSuccessTestCases } from '@common/common/test/utils/generate-success-test-cases';
import * as faker from 'faker';
import { Types } from 'mongoose';
import { UpdateApplicationInput as UpdateEntityInput } from '../update-application.input';

describe('UpdateApplicationInput', () => {
  const updateEntityInput: UpdateEntityInput = {
    where: {
      id: new Types.ObjectId().toHexString()
    },
    data: {
      comments: [faker.lorem.word()]
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
    describe.each([['comments', [faker.datatype.number()]]])(
      '%s',
      (key, value, contain = key) => {
        it(`should return an error if given an invalid ${key} with value ${value}`, () => {
          generateInvalidUpdateInputWithParams(
            updateEntityInput,
            UpdateEntityInput,
            key,
            value,
            contain
          );
        });
      }
    );
  });
});
